import L from 'leaflet';
import intPointMarkerPng from './int-point-marker.png';
import 'leaflet.icon.glyph/Leaflet.Icon.Glyph';

const IntPointIcon = L.icon.glyph({
  prefix: 'ion',
  glyph: 'ion-image',
  glyphSize: '16px',
  iconUrl: intPointMarkerPng
});

export default IntPointIcon