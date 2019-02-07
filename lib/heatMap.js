// function eqfeed_callback(results) {
//   var heatmapData = [];
//   for (var i = 0; results.length; i++) {
//     var coords = results.features[i].geometry.coordinates;
//     var latLng = new google.maps.LatLng(coords[1], coords[0]);

//     heatmapData.push(latLng);
//   }
//   var heatmap = new google.maps.visualization.HeatmapLayer({
//     data: heatmapData,
//     dissipating: false,
//     map: map
//   });
// }