import photosSaga from './photos/photos-saga'
import travelersSaga from './travelers/travelers-saga'

function* dataSaga() {
  yield* photosSaga()
  yield* travelersSaga()
}

export default dataSaga
