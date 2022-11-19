import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import pokeSaga from "./pokeSaga"
import pokeReducer from './pokeSlice'

const saga = createSagaMiddleware()
const store = configureStore({
  reducer: {
    poke: pokeReducer
  },
  middleware: [saga]
})
saga.run(pokeSaga)

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch