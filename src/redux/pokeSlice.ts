import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { pokemonShort, pokeResponse } from '../helpers/types'

interface pokeSliceProps {
  pokes: pokemonShort[],
  next?: string,
  hasMore: boolean,
  isLoading: boolean,
}

const initialValue: pokeSliceProps = {
  pokes: [],
  hasMore: false,
  isLoading: false,
}

const pokeSlice = createSlice({
  name: 'poke',
  initialState: initialValue,
  reducers: {
    getPokeFetch: (state) => {
      state.isLoading = true
    },
    getMorePokeFetch: (state) => {
      state.isLoading = true
    },
    getPokeSuccess: (state, action: PayloadAction<pokeResponse>) => {
      state.pokes = action.payload.results
      state.isLoading = false
      state.hasMore = action.payload.count > state.pokes.length
      state.next = action.payload.next
    },
    getMorePokeSuccess: (state, action: PayloadAction<pokeResponse>) => {
      state.pokes.push(...action.payload.results)
      state.hasMore = action.payload.count > state.pokes.length
      state.isLoading = false
      state.next = action.payload.next
    }
  }
})

export const { getPokeFetch, getMorePokeFetch, getPokeSuccess, getMorePokeSuccess } = pokeSlice.actions
export default pokeSlice.reducer