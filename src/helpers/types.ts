export interface Pokemon {
  id: number
  name: string
  abilities: { slot: number; is_hidden: boolean; ability: { name: string } }[]
  species: { name: string; url: string }
  sprites: {
    front_default: string
  }
}