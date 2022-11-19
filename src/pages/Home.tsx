import React, { useState } from 'react';
import { Button, Flex, Spinner, Table, Tbody, Text, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import Modal from '../components/Modal'
import InfiniteScroll from 'react-infinite-scroll-component';
import UseFetchPokemon from '../helpers/useFetchPokemon';

interface Pokemon {
  name: string
  url: string
}

export default function Home() {
  const [openedPoke, setOpenedPoke] = useState<string | undefined>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, maxItems, fetchMore] = UseFetchPokemon('https://pokeapi.co/api/v2/pokemon/')

  return (
    <Flex justifyContent='center' flex={1}>
      {data ? (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMore}
          hasMore={data.length < maxItems}
          loader={<Flex flex={1} justifyContent='center' mb='20px'><Spinner size='xl' /></Flex>}
          endMessage={
            <Text>Yay! You have seen it all</Text>
          }
        >
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th isNumeric>Pokemon ID</Th>
                <Th minW='400px'>Pokemon Name</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((poke: Pokemon, index: number) => {
                const itms = poke.url.split('/')
                const id = itms[itms.length - 2]

                return (<Tr key={index}>
                  <Td isNumeric >{id}</Td>
                  <Td>{poke.name}</Td>
                  <Td><Button onClick={() => {
                    setOpenedPoke(id)
                    onOpen()
                  }}>Details</Button></Td>
                </Tr>)
              })}
            </Tbody>
          </Table>
        </InfiniteScroll>
      ) : (<Spinner size='xl' />)}
      {isOpen && openedPoke && <Modal pokeId={openedPoke} onClose={() => {
        setOpenedPoke(undefined)
        onClose()
      }} />}
    </Flex>
  );
}
