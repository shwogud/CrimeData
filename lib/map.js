

function crimeType(filter, allInstances, markers) {
  if (filter === "ALL") {
    for(let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
    return;
  }
  
  
  for(let i = 0; i < markers.length; i++) {
    markers[i].setMap(map)
  }

  
  for (var i = 0; i < allInstances.length; i++) {
    if (allInstances[i].location) {
      if (allInstances[i].primary_type !== filter) {
        markers[i].setMap(null);
      }
    }
  }
}

// let gridMarkers = [];
// function grid(lat, lon, allInstances, markers) { //lat = 42.016894, lon = -87.821179
//   var grid = document.createElement('table');
//   grid.className = 'grid';
//   for (lat; lat > 41.645033; lat = lat - 0.00106246) {
//     for (lon; lon < -87.526459; lon = lon + 0.009824) {
//       longitude = lon + 0.004912;
//       latitude = lat - 0.00053123;
//       var latLng = new google.maps.LatLng(longitude, latitude);
//       var marker = new google.maps.Marker({
//         position: latLng,
//         map: map
//       });
//       gridMarkers.push(marker);
      
//     }
//   }
//   return grid;
// }

// function crimeTypeGrid(filter, allInstances, markers) {

// }

