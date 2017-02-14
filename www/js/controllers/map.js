contrl.controller('GoogleMapCtrl', function($scope, $state, $cordovaGeolocation) {
  //attaches autho complete to imnput field
  const ac = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  google.maps.event.addListener(ac, 'place_changed', function() {
    let place = ac.getPlace();
    console.log(place.formatted_address, place.url, place.geometry.location);
  })
  //sets high accuracy
  let options = {timeout: 10000, enableHighAccuracy: true};

  //DEVICE LOCATION: gets ^ options then it fires a function with a position of device
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    //sets device location to a google lat-lng and saves it as a variable
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // establishes current options for current view
    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //NEW MAP:  sets options and display target for a new map to scope
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //DROPS MARKER: drops marker on current location
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });
      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
    });


  },
  //runs if cordova geolocation doesnt get current location
  function(error){
    console.log("Could not get location");
  });


});
