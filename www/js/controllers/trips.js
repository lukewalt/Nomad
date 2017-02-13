contrl.controller('TripsCtrl', function($scope, arrFactory, firebaseFactory){

  // empty array will store all city values from object
  let allCities = [];


  //gets all destinations and sets them to values
  firebaseFactory.getCities()
    .then((val) => {
      //stores returned data in variable
      console.log(val.data);
      let allDestinations = val.data
      //takes all objects and extracts all instince values of city key

        angular.forEach(allDestinations, (k, v) => {
          if (firebase.auth().currentUser.uid === k.uid) {
            //pushes all cities to array
            allCities.push(k.city)
            //filters 1 instince per city
            $scope.cities = arrFactory.cleanArr(allCities)
          }
        })

  })

})
