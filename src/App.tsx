import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getPokeFetch } from './redux/pokeSlice';
import Modal from './components/Modal';
import PokeTable from './components/PokeTable';

export default function App() {
  const [openedPoke, setOpenedPoke] = useState<string | undefined>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { pokes, next, hasMore, isLoading } = useAppSelector((state) => state.poke)
  const dispatch = useAppDispatch()
  const observer = useRef<IntersectionObserver>()

  const lastBookElementRef = useCallback(
    (node: Element | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch({ type: 'poke/getMorePokeFetch', payload: { next } })
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, next, hasMore, dispatch]
  )

  useEffect(() => {
    dispatch(getPokeFetch())
  }, [dispatch])

  return (
    <Flex w='100%' direction='column'>
      <Flex w='100%' h='60px' bgColor='blue' mb='20px' pl='30px' alignItems='center'>
        <Text fontSize='2xl' color='white'>Header</Text>
      </Flex>

      <Flex>
        <Flex flex={1} direction='column' alignItems='center'>
          {pokes.length !== 0 && (<PokeTable data={pokes} onDetails={(id: string) => {
            setOpenedPoke(id)
            onOpen()
          }} observer={lastBookElementRef} />)}
          {isLoading && (<Spinner size='xl' my='20px' />)}

          {isOpen && openedPoke && <Modal pokeId={openedPoke} onClose={() => {
            setOpenedPoke(undefined)
            onClose()
          }} />}
        </Flex>
      </Flex>
    </Flex>
  );
}
