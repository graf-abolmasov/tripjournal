import cableSagas from './action-cable/cable-saga'
import appSagas from "./views/App/app-saga"
import mapSagas from "./views/MapView/map-saga"

function* saga() {
  yield* mapSagas()
  yield* appSagas()
  yield* cableSagas()
}

export default saga
