contrl.controller('SpotCtrl', function($scope, $stateParams, arrFactory ,firebaseFactory){

  $scope.currentCity = $stateParams.city
  let destArr = [];
  let dtArr = [];
  let ttArr = [];
  let itin = document.getElementById('itin')

  //gets spots for the day
  firebaseFactory.getForm()
    .then((val) => {
      //sets all destinations to varibale
      const allDestinations = val.data.destination
      //loops over dests and only returns data matching current city
      angular.forEach(allDestinations, (v, k) => {
        if (v.city === $scope.currentCity) {
          // adds unique key as a value of key/value pair {key: id}
          // to each object locally
          v.key = k;
          //pushes objects of currentCity to array
          destArr.push(v)
          dtArr.push(parseFloat(v.destTime))
          ttArr.push(parseFloat(v.travelTime))
        }
      })
      //sets scope to addition function calling poplated popltd arr
      $scope.totalTrav = arrFactory.daySum(ttArr);
      $scope.totalDest = arrFactory.daySum(dtArr);
      //array of filter objects set to scope
      $scope.dest = destArr
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
      //deletes obj in firebase
      firebaseFactory.deleteForm(key);
      //removes from the DOM
      $scope.dest.splice($scope.dest.indexOf(item), 1);

      //re-calculates day summary
      // firebase.database().ref('destination').on('value', function(snap){
      //   let allObj = snap.val()
      //   angular.forEach(allObj, (v, k) => {
      //     if (v.city === $scope.currentCity) {
      //       // adds unique key as a value of key/value pair {key: id}
      //       // to each object locally
      //       destArr = [];
      //       dtArr = [];
      //       ttArr = [];
      //       v.key = k;
      //       //pushes objects of currentCity to array
      //       destArr.push(v)
      //       dtArr.push(parseFloat(v.destTime))
      //       ttArr.push(parseFloat(v.travelTime))
      //     }
      //   })
      //   //sets scope to addition function calling poplated popltd arr
      //   $scope.totalTrav = arrFactory.daySum(ttArr);
      //   $scope.totalDest = arrFactory.daySum(dtArr);
      //   //array of filter objects set to scope
      //   $scope.dest = destArr
      //
      // })


    };

    $scope.addToFav = (item) => {
      console.log("favs");
      firebaseFactory.postFav(item)
    }


})
