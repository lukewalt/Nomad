contrl.controller('CurTripCtrl', function($scope, $state, $stateParams ,firebaseFactory){
  $scope.currentTrip = $stateParams.trip

  $scope.gotoSpots = () => {
    $state.go('app.spots', {trips: $stateParams.trip})
  }

  $scope.gotoInfo = () => {
    $state.go('app.info', {trips: $stateParams.trip})
  }

  $scope.gotoFavs = () => {
    $state.go('app.fav', {trips: $stateParams.trip})
  }

})
