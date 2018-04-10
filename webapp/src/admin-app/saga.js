import dataSaga from './models/data-saga'

function* saga() {
  yield* dataSaga()
}

export default saga
