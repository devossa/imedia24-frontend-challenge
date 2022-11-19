export interface pokemonDetails {
  id: number
  name: string
  abilities: { slot: number; is_hidden: boolean; ability: { name: string } }[]
  species: { name: string; url: string }
  sprites: {
    front_default: string
  }
}

export interface pokemonShort {
  name: string
  url: string
}

export interface pokeResponse {
  count: number
  next?: string
  previous?: string
  results: pokemonShort[]
}
