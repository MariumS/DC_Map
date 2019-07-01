//personal access token, do not steal
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyemlwYW45NCIsImEiOiJjanVrOTdwaDQxdG42NDRwNGFmbzY5dWdtIn0.4lVQxPc89QYzHas2IIWmew';

//create mapboxgl map, in the map container specified in css
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  //florida center
  center: [-73.935242,40.730610],
  scrollWheelZoom: false,
  scrollZoom: false,
  zoom: 7,
});



map.on('load', function() {
  //adding source for cloropleth. gun deaths data by zipcode by year
  map.addSource('Tmap', {
    type: 'geojson',
    data: './data/Tmap.geojson',
  });

  //adding source for mass shooting points. individual gun incident data, filtered to where n_killed is greater than 4
  map.addSource('DC', {
    type: 'geojson',
    data: './data/DCpoints.geojson',
  });




  map.addLayer({
    id: 'guns_',
    type: 'fill',
    source: 'Tmap',
    paint: {
      'fill-color': [
        // use a curve (http://bl.ocks.org/anandthakker/raw/6d0269825a7e0381cdcde13f84a0b6b0/#types-expression-curve)
        // of type "step," which will step through each break instead of interpolating between them.
        // Then, get the density value and use a `number` expression to return it as a number instead of a string.
        // Each step is then a pair [{color code}, {max value for break}]
        // Finally, add a default color code for any features that fall outside of the steps you've defined.
        "curve",
          ["step"], ["number", ["get", "High_Risk_"], 1], "#FFEDA0", 10, "#FED976", 20, "#FEB24C", 50, "#FD8D3C", 100, "#FC4E2A", 200, "#E31A1C", 500, "#BD0026", 2000, "#000000"
      ],
      'fill-opacity': 0.6
    },
  }
);

  //creating points for mass shootings to overlay on map
  map.addLayer({
    'id': 'HR-circles',
    'type': 'circle',
    'source': 'DC',
    'paint': {
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'High_Risk_'],
        //dots get slightly darker as number killed increases
        1, '#1400BA',
        80, '#050201'
      ],
      'circle-opacity': 0.75,
      'circle-radius': 4
    }
  });
});
