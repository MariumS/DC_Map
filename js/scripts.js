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
      40, '#A2719B',
      50, '#AA5E79'
    ],
    'circle-opacity': 0.75,
    'circle-radius': 4
  }
});

map.on('click', function (e) {
    // Use featuresAt to get features within a given radius of the click event
    // Use layer option to avoid getting results from other layers
    map.featuresAt(e.point, {layer: 'DC', radius: 1, includeGeometry: true}, function (err, features) {
        if (err) throw err;
        // if there are features within the given radius of the click event,
        // fly to the location of the click event
        if (features.length) {
            // Get coordinates from the symbol and center the map on those coordinates
            map.flyTo({center: features[0].geometry.coordinates});
            var featureName = features[0].properties.DC_ID;
            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<p>' + featureName + '</p>')
                .addTo(map);
              }
                 });
             });
             // Use the same approach as above to indicate that the symbols are clickable
             // by changing the cursor style to 'pointer'.
             map.on('mousemove', function (e) {
                 map.featuresAt(e.point, {layer: 'markers', radius: 10}, function (err, features) {
                     if (err) throw err;
                     map.getCanvas().style.cursor = features.length ? 'pointer' : '';
                 });
             });

});
