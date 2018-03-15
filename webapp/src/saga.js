import cableSagas from './action-cable/cable-saga'
import appSagas from "./views/App/app-saga"
import tripsSagas from "./views/TripsView/trips-saga"
import mapSagas from "./views/MapView/map-saga"
import gallerySagas from './views/GalleryView/gallery-saga'

function* saga() {
  yield* gallerySagas()
  yield* mapSagas()
  yield* appSagas()
  yield* tripsSagas()
  yield* cableSagas()
}

export default saga
