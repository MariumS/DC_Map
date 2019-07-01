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

  // Set filter to first year


  // add an empty data source, which we will use to highlight the zipcode the user is hovering over

  map.addSource('highlight-feature', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  // add a layer for the highlighted zipcode
  map.addLayer({
    id: 'highlight-line',
    type: 'line',
    source: 'highlight-feature',
    paint: {
      'line-width': 3,
      'line-opacity': 0.9,
      'line-color': 'black',
    }
  });



  //when the mouse moves, do stuff!
  map.on('mousemove', function(e) {
    // query for the features under the mouse, on both layers
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['guns_cloro', 'mass_shootings-circles'],
    });

    // get the first feature from the array of returned features.
    var census = features[0];
    console.log(census);


    if (census) {
      // if there's a zip under the mouse, do stuff
      map.getCanvas().style.cursor = 'pointer'; // make the cursor a pointer
      //if mass_shootings-circles
      if (census.layer.id === 'mass_shootings-circles') {
        {

          // update the text for the mass shootings area
          $('#n_killed_s').text(`${census.properties.High_Risk_} people were killed in this mass shooting`);

          // clear the text for the zipcode area
          $('#n_killed').text(``);

        }

        // set this lot's polygon feature as the data for the highlight source
        map.getSource('highlight-feature').setData(census.geometry);

        // reset the highlight source to an empty featurecollection

        map.getSource('highlight-feature').setData({
          type: 'FeatureCollection',
          features: []
        })
      }
      //else, zipcode layer
      else {
        //properties for zipcode layer
        $('#n_killed').text(`${census.properties.DC_ID_Per_`} people were killed by guns`);

        //clear the text for mass_shootings
        $('#n_killed_s').text(``);

      }}

    } else {
      map.getCanvas().style.cursor = 'default'; // make the cursor default

      // reset the highlight source to an empty featurecollection
      map.getSource('highlight-feature').setData({
        type: 'FeatureCollection',
        features: []
      }
      });
