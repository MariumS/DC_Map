//personal access token, do not steal
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyemlwYW45NCIsImEiOiJjanVrOTdwaDQxdG42NDRwNGFmbzY5dWdtIn0.4lVQxPc89QYzHas2IIWmew';


var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.0059, 40.7128], // initial map center in [lon, lat]
  zoom: 11
});

map.on('load', function() {

map.addSource('DC', {
  type: 'geojson',
  data: './data/cleen.geojson',
});

map.addLayer({
  'id': 'DC',
  'type': 'circle',
  'source': 'DC',
  "interactive": true,
  'paint': {
    'circle-color': [
      'interpolate',
      ['linear'],
      ['get', 'High_Risk_'],
      //dots get slightly darker as number killed increases
      0, '#daedf4',
      10, '#3BB3C3',
      20, '#669EC4',
      30, '#8B88B6',
      50, '#A2719B',
      80, '#780303'
    ],
    'circle-opacity': 0.75,
    'circle-radius': 4
  }
});
map.on('click', 'DC', function (e) {
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML(`there have been ` + e.features[0].properties.High_Risk_ + ` high risk violations at ` + e.features[0].properties.DC_ID)
.addTo(map);
});

// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'DC', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'DC', function () {
map.getCanvas().style.cursor = '';
});



});
