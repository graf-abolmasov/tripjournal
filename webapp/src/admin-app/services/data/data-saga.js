import photosSaga from './photos/photos-saga'
import travelersSaga from './travelers/travelers-saga'
import tracksSaga from './tracks/tracks-saga'

function* dataSaga() {
  yield* photosSaga()
  yield* travelersSaga()
  yield* tracksSaga()
}

export default dataSaga
