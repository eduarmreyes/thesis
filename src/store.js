import { compose, createStore } from "redux"
import persistState from "redux-store-sessionstorage"

import reducer from "./reducers"

const enhancer = compose(
  // /* [middlewares] */,
  persistState(/*paths, config*/),
)

const store = createStore(reducer, enhancer)

store.subscribe(() => {
  // const state = store.getState()

  // console.log("Subscribe!", state)
})

export default store
