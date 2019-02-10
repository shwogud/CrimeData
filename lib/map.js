

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
}

