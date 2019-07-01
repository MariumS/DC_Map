//personal access token, do not steal
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyemlwYW45NCIsImEiOiJjanVrOTdwaDQxdG42NDRwNGFmbzY5dWdtIn0.4lVQxPc89QYzHas2IIWmew';

//create mapboxgl map, in the map container specified in css
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/dark-v10',
  //florida center
  center: [-73.935242,40.730610],
  scrollWheelZoom: false,
  scrollZoom: false,
  zoom: 5.5,
});



map.on('load', function() {
  map.addLayer({
    id: 'collisions',
    type: 'circle',
    source: {
      type: 'geojson',
      data: './data/AllDC.geojson'
    },
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'High_Risk_']],
        0, 4,
        5, 24
      ],
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
      'circle-opacity': 0.8
    }
  });
});
