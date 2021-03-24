// Creating map object
// let myMap = L.map("map", {
//   center: [40.7128, -74.0059],
//   zoom: 1
// });

// Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2pvZXBvbGxvIiwiYSI6ImNrbTczcDJncTB1azgycW85N2Ewa3ZxNm0ifQ.H1PjhBJI1i6fGKbeE4U_2Q", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_Key
// }).addTo(myMap);

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

// // var goldIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-gold.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

// // var redIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-red.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

// // var greenIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-green.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

// // var orangeIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-orange.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

// // var yellowIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-yellow.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

// // var violetIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-violet.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

// // var greyIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-grey.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

// // var blackIcon = new L.Icon({
// // 	iconUrl: 'img/marker-icon-2x-black.png',
// // 	shadowUrl: 'img/marker-shadow.png',
// // 	iconSize: [25, 41],
// // 	iconAnchor: [12, 41],
// // 	popupAnchor: [1, -34],
// // 	shadowSize: [41, 41]
// // });

let myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 1,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// function sizeMarker(){
//   switch(mag){
//   case mag > 8.0: return {iconSize: [50, 61]};
//   case mag> 7.0: return {iconSize: [40, 51]};
//     case mag> 6.0: return {iconSize: [35, 41]};
//       case mag> 5.0: return {iconSize: [25, 31]};
//         case mag> 4.0: return {iconSize: [15, 21]};
//           case mag> 3.0: return {iconSize: [10, 15]};
//             case mag> 2.0: return {iconSize: [7, 10]};
//               default: return {iconSize: [5, 8]};
//   }
// }

// function colorMarker(){
//   switch(mag){
//   case mag > 8.0: return "red";
//   case mag> 7.0: return "orange";
//     case mag> 6.0: return "yellow";
//       case mag> 5.0: return "green";
//         case mag> 4.0: return "blue";
//           case mag> 3.0: return "purple";
//             case mag> 2.0: return "white";
//               default: return "black";
//   }
// }

let lat = 0
let long = -117
let depth = 33

// Grab the data with d3
d3.json(link).then(function(data) {

  console.log(data)

  // Create a new marker cluster group
  let markers = L.markerClusterGroup();

  console.log(markers)

  // Loop through data
  data.features.forEach(record => {

    //console.log(record)

    // Set the data location property to a variable
    let location = record.geometry;

    console.log(location)    

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.circleMarker([location.coordinates[1], location.coordinates[0]],
        {radius:5,
        fillColor:"#ff6666",
        color:"#000"
        })
        .bindPopup(record.descriptor));
    }

  });

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});



// d3.json(link).then(data => {
//   createFeatures(lat,long);
// });


// function createFeatures(earthquakeData,myMap){
// function onEachFeature() {
  
//     for( let i=1; i< data.length; i++){
//       long=data.features[i].geometry.coordinates[0]
//       lat=data.features[i].geometry.coordinates[1]
//       depth=data.features[i].geometry.coordinates[2]
    
//     console.log(`${lat},${long}`)
//     }
//     }

//     earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//     });

//   createMap(earthquakes)
// }


// function createMap(earthquakes) {

//   // Define streetmap and darkmap layers
//   let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_Key
//   });

//   let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: API_Key
//   });


//   // Define a baseMaps object to hold our base layers
//   let baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };


//   // Create overlay object to hold our overlay layer
//   let overlayMaps = {
//     Earthquakes: earthquakes
//   };

//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     let myMap = L.map("map", {
//       center: [
//         37.09, -95.71
//       ],
//       zoom: 5,
//       layers: [streetmap, earthquakes]
//     });

//     L.marker([lat,long], {
//       draggable: true,
//       title: "Quake"}).addTo(myMap)
  
//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);


