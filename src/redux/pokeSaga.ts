import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { pokeResponse } from '../helpers/types'
import { getPokeSuccess, getMorePokeSuccess } from './pokeSlice'

function* workGetPokeFetch() {
  const pokeResponse: Response = yield call(fetch, 'https://pokeapi.co/api/v2/pokemon/')
  const pokeList: pokeResponse = yield pokeResponse.json()

  yield put(getPokeSuccess(pokeList))
}

function* workGetMorePokeFetch(action: PayloadAction<{ next: string }>) {
  if (!action.payload.next) return
  const pokeResponse: Response = yield call(fetch, action.payload.next)
  const pokeList: pokeResponse = yield pokeResponse.json()

  yield put(getMorePokeSuccess(pokeList))
}

function* pokeSaga() {
  yield takeEvery('poke/getPokeFetch', workGetPokeFetch)
  yield takeEvery('poke/getMorePokeFetch', workGetMorePokeFetch)
}

export default pokeSaga