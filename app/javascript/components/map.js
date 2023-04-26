const showDistance = (e) => {
  //create autocomplete objects for all inputs
  var options = { types: ['address']};
  var input1 = document.getElementById("from");
  var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  var input2 = document.getElementById("to");
  var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

  //  Set map options
  var mylatlng = { lat: 46.283980, lng: 6.086040 };
  var mapOptions = {
    center: mylatlng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Create map
  var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)
  // Create a Directions service object to use route method and get result for our request
  var directionsService = new google.maps.DirectionsService();
  // Create a DirectionsRenderer object to display directions on the map
  var directionsDisplay = new google.maps.DirectionsRenderer();
  //  Bind the directionsRenderer to the map
  directionsDisplay.setMap(map);

  // Define a named function for the listener
  function onBtnMibClick() {
    // Call the calRoute function
    calRoute();
  }

  // Get the button element
  var btnMib = document.getElementById('btn-mib');

  // Add a passive event listener to the button
  btnMib.addEventListener('click', onBtnMibClick, { passive: true });

  function calRoute(){
  //define calcRoute function
    // create request
    var request = {
      origin: document.getElementById('from').value,
      destination: document.getElementById('to').value,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    };
    //  Pass the request to the route method
    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        const load = 5;
        const coef = 2;
        const km = result.routes[0].legs[0].distance.value / 1000;

        const price = coef * km + load;
        const minPrice = 30;
        const output = document.querySelector('#output');
        if (km < 13) {
          output.innerHTML = "<div class='alert-mib'> Distance : " + result.routes[0].legs[0].distance.text + " .<br /> Prix de la course : " + minPrice.toFixed() + ".- € .<br /> Durée du trajet : " + result.routes[0].legs[0].duration.text + ". </div>";
          directionsDisplay.setDirections(result);
        }
        else {
        // Get distance and time
        output.innerHTML = "<div class='alert-mib'> Distance : " + result.routes[0].legs[0].distance.text + " .<br /> Prix de la course : " + price.toFixed() + ".- € .<br /> Durée du trajet : " + result.routes[0].legs[0].duration.text + ". </div>";
        // Display the routes
        directionsDisplay.setDirections(result);
        }
      } else {
        // Delete route from map
        directionsDisplay.setDirections({ routes: [] });
        // Center the map
        map.setCenter(mylatlng);
        // Error msg
        output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Impossible de calculer cette course ! </div>";
      }
    });
  }
};

export { showDistance };
