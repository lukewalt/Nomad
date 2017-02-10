contrl.controller('SpotCtrl', function($scope, $stateParams, firebaseFactory){

  let destArr = [];
  let itin = document.getElementById('itin')
  $scope.currentCity = $stateParams.city

  //gets spots for the day
  firebaseFactory.getForm()
    .then((val) => {
      //sets all destinations to varibale
      let allDestinations = val.data.destination
      //loops over dests and only returns data matching current city
      angular.forEach(allDestinations, (v, k) => {
        if (v.city === $scope.currentCity) {
          //push days to user for card iteration
          v.key = k;
          destArr.push(v)
        }
      })
      $scope.dest = destArr
      console.log(destArr);
    })

    //UI Slide / delete / reorder
    $scope.data = {
        showDelete: false
      };

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.dest.splice(fromIndex, 1);
      $scope.dest.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function(item, key) {
      firebaseFactory.deleteForm(key);
      $scope.dest.splice($scope.dest.indexOf(item), 1);
    };

})
