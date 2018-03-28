import dataSaga from './services/data/data-saga'

function* saga() {
  yield* dataSaga()
}

export default saga
