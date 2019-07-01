//personal access token, do not steal
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyemlwYW45NCIsImEiOiJjanVrOTdwaDQxdG42NDRwNGFmbzY5dWdtIn0.4lVQxPc89QYzHas2IIWmew';


var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.0059, 40.7128], // initial map center in [lon, lat]
  zoom: 11
});

map.addSource('DC', {
  type: 'geojson',
  data: './data/cleen.geojson',
});

map.addLayer({
id: 'DC-circles',
type: 'circle',
source: 'DC',
paint: {

  'circle-color': [
    'interpolate',
    ['linear'],
    ['number', ['get', 'High_Risk_']],
    0, '#2DC4B2',
    10, '#3BB3C3',
    20, '#669EC4',
    30, '#8B88B6',
    40, '#A2719B',
    50, '#AA5E79'
  ],
  'circle-opacity': 0.8,
  'circle-radius': 24
}

});
