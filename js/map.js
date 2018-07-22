/* --------- GEOLOCATION, MARKER & DIRECTIONS ------------*/
var initMap = function () {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(37.763750, -122.408602),
    zoom: 15,
  });

	var start;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
      start = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      generateMap(start, directionsService, directionsDisplay);
    },
		function(){
			handleLocationError(true, markerme);
		});
  } else {
      window.alert('Geolocation is not support in this browser');
  }

	onChangeHandler = function() {
  	generateMap(start, directionsService, directionsDisplay);
  };
  document.getElementById('end-1').addEventListener('change', onChangeHandler);
}

var generateMap = function (start, service, display) {
  var directions = {
    origin: new google.maps.LatLng(start.lat, start.lng),
    destination: document.getElementById('end-1').value, //Food Life Line Seattle 47.516761, -122.322403
    travelMode: 'DRIVING'
  };

  display.setMap(map);
  service.route(directions, function(response, status) {
    if (status == 'OK') {
      display.setDirections(response);
    }
  });
};

initMap();
