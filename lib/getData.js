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
    
    heatmap.setMap(null)
    heatmap.setData([])

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

    // return $.ajax({
    //   // url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=year%20=%202015%20AND%20primary_type%20in(%27MOTOR%20VEHICLE%20THEFT%27,%20%27NARCOTICS%27,%20%20%27HOMICIDE%27,%20%20%27CRIMINAL%20DAMAGE%27)",
    //   url: url,
    //   type: "GET",
    //   data: {
    //     "$limit": 1000,
    //     "$$app_token": "wM4UmKIK1njJ3mRX8vC0J7Ba6"
    //   }
    // }).then(function (data) {
    //   // alert("Retrieved " + data.length + " records from the dataset!");
    //   for (let i = 0; i < data.length; i++) {

    //     if (!data[i].location) {
    //       continue;
    //     }

    //     // if (data[i].primary_type === "CREDIT CARD FRAUD") {
    //     //   batteryInstances.push(data[i]);
    //     // }
    //     if (data[i].primary_type === "MOTOR VEHICLE THEFT") {
    //       theftInstances.push(data[i]);
    //     }
    //     else if (data[i].primary_type === "HOMICIDE ") {
    //       homicideInstances.push(data[i]);
    //     }
    //     else if (data[i].primary_type === "NARCOTICS") {
    //       narcoticsInstances.push(data[i]);
    //     }
    //     else if (data[i].primary_type === "CRIMINAL DAMAGE") {
    //       deceptivePracticeInstances.push(data[i]);
    //     }
    //     allInstances.push(data[i]);
    //   }


    //   heatmapData = [];
    //   for (var i = 0; i < allInstances.length; i++) {

    //     if (allInstances[i].location) {
    //       var coords = allInstances[i].location.coordinates;
    //       var latLng = new google.maps.LatLng(coords[1], coords[0]);
    //       var marker = new google.maps.Marker({
    //         position: latLng,
    //         map: map
    //       });
   
    //       markers.push(marker);

    //       heatmapData.push(latLng);
    //     }
    //   }

      
    //   heatmap = new google.maps.visualization.HeatmapLayer({
    //     data: heatmapData,
    //     dissipating: false,
    //     radius: 10,
    //     opacity: 0.3,
    //     map: map
    //   });

    //   heatmap.setMap(map);




    //   var crimeFilterButtons = document.getElementsByClassName("crime-filter-button");

    //   for (let i = 0; i < crimeFilterButtons.length; i++) {

    //     crimeFilterButtons[i].addEventListener("click", (e) => {
    //       e.preventDefault();

    //       crimeType(e.target.innerText, allInstances, markers);

    //     })
    //   }
    // });
  } 

  request() //invoking
  
});