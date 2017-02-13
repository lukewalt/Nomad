contrl.controller('SpotCtrl', function($scope, $stateParams, $timeout, $state, arrFactory ,firebaseFactory){

  $scope.currentCity = $stateParams.city
  let itin = document.getElementById('itin')

  let curCityDest = [];
  let dt = [];
  let tt = [];

  // firebase.database().ref('destination').orderByChild('city').equalTo($scope.currentCity)
  firebase.database().ref('destination').on('value', () => {
    firebaseFactory.getForm()
    .then((val) => {
      //sets all destinations to varibale
      const allDestinations = val
      //loops over dests and only returns data matching current city
      angular.forEach(allDestinations, (v, k) => {
        if (v.city === $scope.currentCity) {
          // adds unique key as a value of key/value pair {key: id}
          // to each object locally
          v.key = k;
          //pushes objects of currentCity to array
          curCityDest.push(v)
          dt.push(parseFloat(v.destTime))
          tt.push(parseFloat(v.travelTime))
        }
      })
      //sets scope to addition function calling poplated popltd arr
      $scope.totalTrav = arrFactory.daySum(tt);
      $scope.totalDest = arrFactory.daySum(dt);
      //array of filter objects set to scope
      $scope.dest = curCityDest
    })

    curCityDest = [];
    dt = [];
    tt = [];
  })
  //gets spots for the day


    //UI Slide / delete / reorder
    $scope.data = {
        showDelete: false
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


/*
      //re-calculates day summary
      firebase.database().ref('destination').on('child_changed', function(snap){
        let allObj = snap.val()
        angular.forEach(allObj, (v, k) => {
          if (v.city === $scope.currentCity) {

            //pushes objects of currentCity to array
            curCityDest.push(v)
            dt.push(parseFloat(v.destTime))
            tt.push(parseFloat(v.travelTime))
          }
        })
        //sets scope to addition function calling poplated popltd arr
        $scope.totalTrav = arrFactory.daySum(tt);
        $scope.totalDest = arrFactory.daySum(dt);
        //array of filter objects set to scope
        $scope.dest = curCityDest

      })

*/
    };

    $scope.flag = false;
    $scope.addToFav = (item) => {
      console.log("favs");
      firebaseFactory.postFav(item)
      .then(()=>{ $scope.flag = true })
      .then($timeout(() => {
        $scope.flag = false;
      },3500))
    }

    $scope.addAnotherSpot = () => {
      $state.go('app.form');
    }


})
