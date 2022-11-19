import { Table, Thead, Tr, Th, Tbody, Td, Button } from "@chakra-ui/react"
import { pokemonShort } from "../helpers/types"

interface PokeTableProps {
  data: pokemonShort[]
  onDetails: (id: string) => void
  observer: (node: Element | null) => void
}
const PokeTable = ({ data, onDetails, observer }: PokeTableProps) => {
  return (<Table variant='simple'>
    <Thead>
      <Tr>
        <Th isNumeric>Pokemon ID</Th>
        <Th minW='400px'>Pokemon Name</Th>
        <Th>Details</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((poke: pokemonShort, index: number) => {
        const itms = poke.url.split('/')
        const id = itms[itms.length - 2]

        return (<Tr key={index} {...(index === data.length - 1 ? { ref: observer } : {})}>
          <Td isNumeric >{id}</Td>
          <Td>{poke.name}</Td>
          <Td><Button onClick={onDetails.bind(null, id)}>Details</Button></Td>
        </Tr>)
      })}
    </Tbody>
  </Table>)
}

export default PokeTable