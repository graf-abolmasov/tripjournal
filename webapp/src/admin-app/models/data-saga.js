import tracksSaga from '../../common/models/tracks/tracks-saga'
import intPointsSaga from '../../common/models/int-points/int-points-saga'
import photosSaga from './photos/photos-saga'
import travelersSaga from './travelers/travelers-saga'

function* dataSaga() {
  yield* photosSaga()
  yield* travelersSaga()
  yield* tracksSaga()
  yield* intPointsSaga()
}

export default dataSaga
