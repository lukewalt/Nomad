contrl.controller('FavCtrl', function($scope, $stateParams, arrFactory ,firebaseFactory){

  $scope.currentCity = $stateParams.city
  let favArr = [];


  firebaseFactory.getFavs()
  .then((val)=>{
    const allFavs = val.data
    angular.forEach(allFavs, (v, k) => {
      if (v.city === $scope.currentCity) {
        console.dir(allFavs);
        v.favSpotKey = k;
        favArr.push(v)
      }
    })
    $scope.favSpots = favArr;
  })

})
