document.addEventListener('DOMContentLoaded', () => {
  // var buttons = document.getElementsByTagName("button");
  // for(let i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener(onclick, (e) => {
  //     initMap(e.currentTarget.value);
  //   })
  // }


  let batteryInstances = [];
  let theftInstances = [];
  let assaultInstances = [];
  let narcoticsInstances = [];
  let motorVehicleTheftInstances = [];
  let allInstances = [];

  return $.ajax({
    url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date%20between%20%272019-01-5%27%20and%20%272019-02-5%27",
    type: "GET",
    data: {
      "$limit": 100,
      "$$app_token": "wM4UmKIK1njJ3mRX8vC0J7Ba6"
    }
  }).then(function (data) {
    // alert("Retrieved " + data.length + " records from the dataset!");
    for (let i = 0; i < data.length; i++) {
      // debugger
      if (!data[i].location) {
        continue;
      }

      if (data[i].primary_type === "BATTERY") {
        batteryInstances.push(data[i]);
      }
      else if (data[i].primary_type === "THEFT") {
        theftInstances.push(data[i]);
      }
      else if (data[i].primary_type === "ASSAULT") {
        assaultInstances.push(data[i]);
      }
      else if (data[i].primary_type === "NARCOTICS") {
        narcoticsInstances.push(data[i]);
      }
      else if (data[i].primary_type === "MOTOR VEHICLE THEFT") {
        motorVehicleTheftInstances.push(data[i]);
      }
      allInstances.push(data[i]);
    }

    let markers = [];
    for (var i = 0; i < allInstances.length; i++) {
      // debugger
      // console.log(i);
      if (allInstances[i].location) {
        var coords = allInstances[i].location.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        // console.log(marker);
        markers.push(marker);
      }
      
    }
    debugger
    var crimeFilterButtons = document.getElementsByClassName("crime-filter-button")

    
    for (let i = 0; i < crimeFilterButtons.length; i++) {
      debugger
      crimeFilterButtons[i].addEventListener("click", (e) => {
        e.preventDefault(); 
        debugger
        crimeType(e.target.innerText, allInstances, markers);
        debugger
      })
    }

  });


});