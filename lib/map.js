

function crimeType(filter, allInstances, markers) {
  debugger
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



  
  
  

  // console.log("HELLO");
  // console.log(filter);
  // if (filter === 'BATTERY') {

  // }
  // else if (filter === 'THEFT') {
    
  // }
  // else if (filter === 'ASSAULT') {

  // }
  // else if (filter === 'NARCOTICS') {

  // }
  // else if (filter === 'MOTOR VEHICLE THEFT') {

  // }

  // for (let i = 0; i < allInstances.length; i++) {
  //   debugger
  //   if (allInstances[i].primary_type === filter) {
  //     var coords = allInstances[i].location.coordinates;
  //     var latLng = new google.maps.LatLng(coords[1], coords[0]);
  //     var marker = new google.maps.Marker({
  //       position: latLng,
  //       map: map
  //     });
  //   }
  // }




}
