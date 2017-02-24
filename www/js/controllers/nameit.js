contrl.controller('NameitCtrl', function($scope, $state, $location, $cordovaGeolocation, gooGeoFactory) {
  $scope.trip = {}

  let options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options)
  .then((position)=>{
    console.log(position.coords.latitude, position.coords.longitude);
    gooGeoFactory.geoCode(position.coords.latitude, position.coords.longitude)
    .then((adr)=> {

      let strspl = adr.split(" ")
      let cty = '';
      for (var i = 0; i < 6; i++) {
        cty += strspl[i] + " "

      }
      console.log(cty);
      $scope.curCity = cty
    })

  })

  $scope.getTrip = () => {
    $scope.currentTrip = $scope.trip.name
    console.log("current trip  ", $scope.currentTrip);
    $state.go('map.view', {trip: "$scope.trip.name"});

  }

  $scope.gotoTrips = () => {
    $state.go('app.trips')
  }
})
