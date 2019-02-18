

function crimeType(filter, allInstances, markers) {
  if (filter === "ALL") {
    for(let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
    return;
  }
  
  debugger
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

function createHeatmap(heatmapData, options = {}) {

  let parsedHeatmapData = [];
  heatmapData.forEach(coord => {
    parsedHeatmapData.push(
      { location: new google.maps.LatLng(coord[0], coord[1]), weight: coord[2] }

    );
  });


  let heatmap = new google.maps.visualization.HeatmapLayer({
    data: parsedHeatmapData
  });

}

