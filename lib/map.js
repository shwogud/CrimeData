

function crimeType(filter, allInstances, markers, heatmap) {
  let motorVehicleTheft = [];
  let homicide = [];
  let narcotics = [];
  let criminalDamage = [];
  let all = [];
  let weight;
  let maxWeight = 0;
  
  
  let filteredInstances = allInstances.filter( instance => {
    if (instance.primary_type === filter || filter === "ALL") {
      return true
    }
    // return instance.primary_type === filter
  });

  let filteredInstanceDataPoints = [];
  for (let i = 0; i < filteredInstances.length; i++) {
    filteredInstanceDataPoints.push([filteredInstances[i].latitude, filteredInstances[i].longitude])
  }
  
  filteredInstanceDataPoints.sort((coord1, coord2) => {
    let lat1 = coord1[0];
    let lat2 = coord2[0];
    let comparison;

    if (lat1 < lat2) {
      comparison = -1;
    }
    if (lat1 > lat2) {
      comparison = 1;
    }
    if (lat1 === lat2) {
      comparison = 0;
    }
    return comparison;
  });

  for (let i = 0; i < filteredInstanceDataPoints.length; i++) {
    weight = 1;
    for (let j = i + 1; j < filteredInstanceDataPoints.length - 1; j++) {
      let lat1 = filteredInstanceDataPoints[i][0];
      let lat2 = filteredInstanceDataPoints[j][0];
      let long1 = filteredInstanceDataPoints[i][1];
      let long2 = filteredInstanceDataPoints[j][1];

      //if the difference isnt great enough reject that point and add a weight
      if (lat2 - lat1 <= 0.008 && long2 - long1 <= 0.008) {
        filteredInstanceDataPoints.splice(j, 1);
        weight += 4;
      }
    }
    //each coordinate has a weight
    //set max intensity
    if (maxWeight < weight) maxWeight = weight;
    // window.maxWeight = maxWeight;
    //add weight to data point to create weighted point
    filteredInstanceDataPoints[i].push(weight);
  }
  
  heatmap.setMap(null)
  heatmap.setData([])

  
  createHeatmap(filteredInstanceDataPoints)
  
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

function createHeatmap(filteredDataPoints, options = {}) {
  let heatmap;

  let parsedHeatmapData = [];
  filteredDataPoints.forEach(coord => {
    parsedHeatmapData.push(
      { location: new google.maps.LatLng(coord[0], coord[1]), weight: coord[2] }

    );
  });

  window.heatmap = new google.maps.visualization.HeatmapLayer({
    data: parsedHeatmapData,
    dissipating: false,
    // gradient: gradient,
    maxIntensity: 15,
    opacity: 0.2,
    map: map
  });

  // heatmap.setMap(null)
  // heatmap.setData([])

}

