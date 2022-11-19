import { useState, useEffect, useCallback } from "react";
import { request } from "./api";

interface Poke {
  name: string
  url: string
}

export default function UseFetchPokemon(baseUrl: string): [Poke[] | undefined, number, () => Promise<void>] {
  const [pokeList, setPokeList] = useState<Poke[] | undefined>()
  const [maxItems, setMaxItems] = useState(0)
  const [next, setNext] = useState(baseUrl)


  const fetchMore = useCallback(async () => {
    const data = await request(next)
    setNext(data.next)
    setPokeList((old_state) => {
      const newState = [...(old_state || []), ...data.results]
      return newState
    })
  }, [next]);

  useEffect(() => {
    const asyncFunc = async () => {
      const data = await request(next)
      setNext(data.next)
      setMaxItems(data.count)
      setPokeList([...data.results])
    }
    asyncFunc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [pokeList, maxItems, fetchMore]
}