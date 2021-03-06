

var blackIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-black.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// Use this link to get the geojson data.
let link = "static/data/eq.geojson";


//Defining markers from github pointhi
var blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});



let myMap = L.map("map", {
  center: [17.97, -66.91],
  zoom: 4
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

function getColor(d) {
  return d >= 100 ? 'brown' : 
    d >= 50 ? 'red' : 
    d >= 25 ? 'orange' :
    d >= 10 ? 'green' : 
    'grey';
}


// Grab the data with d3
d3.json(link).then(function(data){

  console.log(data)

  // Create a new marker cluster group
  let markers = L.markerClusterGroup();

  console.log(markers)

  // Loop through data
  data.features.forEach(record => {

    console.log(record)

    // Set the data location property to a variable
    let location = record.geometry;
    let magnitude = record.properties.mag**2;
    let depth = record.geometry.coordinates[2]/100

    console.log(location)    

    // Check for location property
    if (location) {
 
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.circleMarker([location.coordinates[1], location.coordinates[0]],
        {
          color: getColor(record.geometry.coordinates[2]), 
          fillColor: getColor(record.geometry.coordinates[2]),
        opacity: depth,
        radius: magnitude,
        shadowAnchor: [22, 94]
        })
        .bindPopup(record.properties.place + "<br>Magnitude " + record.properties.mag));
      }


            

    });

    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "legend");
      div.innerHTML= 
          '<p><b>USGS Magnitude 2.5+ Earthquakes, March 22nd, 2020</b></p><hr>' +
          '<p>Explanation</p>' +
          '<p><ul>' +
          '<li>Proximal earthquakes show clustered (zoom in for details)</li>' +
          '<li>Marker size represents magnitude</li>' +
          '<li>Color represents depth</li>' +
          '<li>Greater depths indicated are darker</li>' +
          '</ul></p>' +
          'Each marker has a <b>popup</b>. ' + 
          'Click on a maker to see place and magnitude<hr>' +
            '<img src="static/images/leaflet.png" width=20px length=5px>';
      return div;
  };

  legend.addTo(myMap)


  // Add our marker cluster layer to the map
  myMap.addLayer(markers);


});   



