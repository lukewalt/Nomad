contrl.controller('TripsCtrl', function($scope, $stateParams, arrFactory, firebaseFactory){

  console.log($stateParams.trip);
  // empty array will store all city values from object
  let allTrips = [];

  //gets all destinations and sets them to values
  firebaseFactory.getTrips()
    .then((val) => {
      //stores returned data in variable
      let allDestinations = val.data
      //takes all objects and extracts all instince values of city key
      console.log(allDestinations);
        angular.forEach(allDestinations, (k, v) => {
          console.log(k.uid);
          console.log(firebase.auth().currentUser.uid);
          if (firebase.auth().currentUser.uid === k.uid) {
            //pushes all cities to array
            allTrips.push(k.trip)
            //filters 1 instince per city
            $scope.trips = arrFactory.cleanArr(allTrips)
          }
        })

  })

})
