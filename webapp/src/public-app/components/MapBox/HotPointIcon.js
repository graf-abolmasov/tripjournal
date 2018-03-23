import L from 'leaflet';
import hotPointMarkerPng from './hot-point-marker.png';
import 'leaflet.icon.glyph/Leaflet.Icon.Glyph';

const HotPointIcon = L.icon.glyph({
  prefix: 'ion',
  glyph: 'ion-android-car',
  glyphSize: '20px',
  iconUrl: hotPointMarkerPng
});

export default HotPointIcon