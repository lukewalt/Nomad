contrl.controller('TripsCtrl', function($scope, arrFactory, firebaseFactory){

  // empty array will store all city values from object
  let allCities = [];

  //gets all destinations and sets them to values
  firebaseFactory.getForm()
    .then((val) => {
      //stores returned data in variable
      let allDestinations = val.data.destination
      //takes all objects and extracts all instince values of city key
      angular.forEach(allDestinations, (k, v) => {
        //pushes all cities to array
        allCities.push(k.city)
        //filters 1 instince per city
        $scope.cities = arrFactory.cleanArr(allCities)
      })
    })

})
