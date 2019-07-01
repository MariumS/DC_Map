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

  //creating cloropleth
  map.addLayer({
    id: 'guns_cloro',
    type: 'fill',
    source: 'Tmap',
    paint: {
      'fill-color': {
        property: 'High_Risk_',
        //color gets more red as number killed increases
        stops: [
          [0, '#f7cdcd'],
          [10, '#ee9f9f'],
          [20, '#ea8888'],
          [30, '#e15e5e'],
          [40, '#dd4a4a'],
          [50, '#cc0000'],
        ]
      }
    }
  });

  //creating points for mass shootings to overlay on map
  map.addLayer({
    'id': 'mass_shootings-circles',
    'type': 'circle',
    'source': 'DC',
    'paint': {
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'High_Risk_'],
        //dots get slightly darker as number killed increases
        1, '#1400BA',
        30, '#050201'
      ],
      'circle-opacity': 0.75,
      'circle-radius': 4
    }
  });
});
