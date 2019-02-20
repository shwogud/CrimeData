document.addEventListener('DOMContentLoaded', () => {
  // var buttons = document.getElementsByTagName("button");
  // for(let i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener(onclick, (e) => {
  //     initMap(e.currentTarget.value);
  //   })
  // }


  let batteryInstances = [];
  let theftInstances = [];
  let homicideInstances = [];
  let narcoticsInstances = [];
  let deceptivePracticeInstances = [];
  let allInstances = [];

  let markers = [];

  let heatmap;
  let heatmapData = [];



  let possible_ajax_urls = [
    //2015
    "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=year%20=%202015%20AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",

    //2016
    "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=year%20=%202016%20AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",

    //2017
    "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=year%20=%202017%20AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",

    //2018 Jan - July
    "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date%20between%20%272018-01-01%27%20and%20%272018-07-01%27AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",

    //2018 July - Dec
    "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date%20between%20%272018-07-01%27%20and%20%272019-01-01%27AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",

    //2019 Jan - July
    "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date%20between%20%272019-01-01%27%20and%20%272019-07-01%27AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",

  ]



  
  // var timeFilterOptions = document.getElementsByClassName("time-filter-option");


  // HAVING TROUBLE FIGURING OUT "change" FOR SELECT-OPTION ELEMENTS SO INSTEAD MAYBE TURN THEM ALL INTO BUTTONS AND USE "click"
  //loop through them, as below, giving each a click event, if its equal to e.target.value, set the url to the correct ajax request


  var selectOption = document.getElementsByClassName("time-period-choice")[0];
  let url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=year%20=%202015%20AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)";
  selectOption.addEventListener("input", (e) => {

    
    console.log(e.target.value)
    e.preventDefault();
    if (e.target.value === "2015") {
      url = possible_ajax_urls[0];
    }
    else if (e.target.value === "2016") {
      url = possible_ajax_urls[1];
    }
    else if (e.target.value === "2017") {
      url = possible_ajax_urls[2];
    }
    else if (e.target.value === "2018 (Jan - Jul)") {

      url = possible_ajax_urls[3];

    }
    else if (e.target.value === "2018 (Jul - Dec)") {
      url = possible_ajax_urls[4];
    }
    else if (e.target.value === "2019 (Jan - Present)") {
      url = possible_ajax_urls[5];
    }
    
    window.heatmap.setMap(null)
    window.heatmap.setData([])
    

    for (var i = 0; i < markers.length; i++) {

      markers[i].setMap(null);
      markers[i] = null;
    }
    markers = [];
    heatmapData = [];

    request()
  })


  const request = () => {
    allInstances = [];
    markers = [];
  
    filteredDataPoints = [];

    return $.ajax({
      // url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=year%20=%202015%20AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",
      url: url,
      type: "GET",
      data: {
        "$limit": 200,
        "$$app_token": "wM4UmKIK1njJ3mRX8vC0J7Ba6"
      }
    }).then(function (data) {
      // alert("Retrieved " + data.length + " records from the dataset!");
      for (let i = 0; i < data.length; i++) {

        if (!data[i].location) {
          continue;
        }

        // if (data[i].primary_type === "CREDIT CARD FRAUD") {
        //   batteryInstances.push(data[i]);
        // }
        if (data[i].primary_type === "MOTOR VEHICLE THEFT") {
          theftInstances.push(data[i]);
        }
        else if (data[i].primary_type === "HOMICIDE ") {
          homicideInstances.push(data[i]);
        }
        else if (data[i].primary_type === "NARCOTICS") {
          narcoticsInstances.push(data[i]);
        }
        else if (data[i].primary_type === "CRIMINAL DAMAGE") {
          deceptivePracticeInstances.push(data[i]);
        }
        // debugger
        allInstances.push(data[i]);
        filteredDataPoints.push([data[i].latitude, data[i].longitude])
      }


      heatmapData = [];
      for (var i = 0; i < allInstances.length; i++) {

        if (allInstances[i].location) {
          var coords = allInstances[i].location.coordinates;
          var latLng = new google.maps.LatLng(coords[1], coords[0]);
          // var marker = new google.maps.Marker({
          //   position: latLng,
          //   map: map
          // });
   
          // markers.push(marker);

          heatmapData.push(latLng);
        }
      }


      let weight;
      let maxWeight = 0;

      //sort the data points based on latitude
      filteredDataPoints = filteredDataPoints.sort((coord1, coord2) => {
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

      // debugger
      
      for (let i = 0; i < filteredDataPoints.length; i++) {
        weight = 1;
        for (let j = i + 1; j < filteredDataPoints.length - 1; j++) {
          let lat1 = filteredDataPoints[i][0];
          let lat2 = filteredDataPoints[j][0];
          let long1 = filteredDataPoints[i][1];
          let long2 = filteredDataPoints[j][1];
          
          //if the difference isnt great enough reject that point and add a weight
          if (lat2 - lat1 <= 0.008 && long2 - long1 <= 0.008) {
            filteredDataPoints.splice(j, 1);
            weight += 4;
          }
        }
        //each coordinate has a weight
        //set max intensity
        // if (maxWeight < weight) maxWeight = weight;
        // window.maxWeight = maxWeight;
        //add weight to data point to create weighted point
        filteredDataPoints[i].push(weight);
      }

      let parsedHeatmapData = [];
      filteredDataPoints.forEach(coord => {
        parsedHeatmapData.push(
          { location: new google.maps.LatLng(coord[0], coord[1]), weight: coord[2] }
        )
      })

      heatmap = new google.maps.visualization.HeatmapLayer({
 
        radius: 20,
        data: parsedHeatmapData,
        dissipating: false,
        // gradient: gradient,
        maxIntensity: 15,
        opacity: 0.2,
        map: map
      });

      // heatmap.setData('radius', 2);
      window.heatmap = heatmap;
      
      // heatmap.setMap(map);
      // heatmap.setMap(null)
      // heatmap.setData([])

      // createHeatmap(filteredDataPoints);


      
      var crimeFilterButtons = document.getElementsByClassName("crime-filter-button");
   
      for (let i = 0; i < crimeFilterButtons.length; i++) {
        crimeFilterButtons[i].addEventListener("click", (e) => {
    
          for (let i = 0; i < crimeFilterButtons.length; i++) {
            crimeFilterButtons[i].classList.remove("selected");
          }

          e.preventDefault();
          
          e.target.classList.add("selected");
          // e.target.disabled = true;
          // crimeFilterButtons[i].focus();
          
          crimeType(e.target.innerText, allInstances, markers, window.heatmap);
          
        })
      }
    });

  } 

  request() //invoking
  
});