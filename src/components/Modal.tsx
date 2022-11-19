import { Modal as ChakraModal, Image, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Flex, UnorderedList, ListItem } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Pokemon } from "../helpers/types"

interface ModalProps {
  pokeId?: string
  onClose: () => void
}

export default function Modal({ pokeId, onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [pokeData, setPokeData] = useState<Pokemon | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)

      response.json().then((res) => {
        setPokeData(res)
        setIsLoading(false)
      })
    }
    fetchData()
  }, [pokeId])
  return (
    <ChakraModal size='2xl' isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isLoading ? 'Loading' : pokeData?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (<Flex flex={1} justifyContent='center' mb='20px'><Spinner size='xl' /></Flex>) : (
            <Flex direction='column' mb='20px'>
              <Image src={pokeData?.sprites.front_default} w='50%' marginX='auto' />
              <Text fontSize='lg' fontWeight='bold'>Species: {pokeData?.species.name}</Text>
              <Text fontSize='lg' fontWeight='bold'>Abilities:</Text>
              <UnorderedList>
                {pokeData?.abilities.map((ability) => (
                  <ListItem key={ability.ability.name}>{ability.ability.name}</ListItem>
                ))}
              </UnorderedList>

            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}