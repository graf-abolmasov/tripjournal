import tracksSaga from '../../common/models/tracks/tracks-saga'
import photosSaga from './photos/photos-saga'
import travelersSaga from './travelers/travelers-saga'

function* dataSaga() {
  yield* photosSaga()
  yield* travelersSaga()
  yield* tracksSaga()
}

export default dataSaga
