contrl.controller('NameitCtrl', function($scope, $state, $location) {
  $scope.trip = {}

  $scope.getTrip = () => {
    $scope.currentTrip = $scope.trip.name
    console.log("current trip  ", $scope.currentTrip);
    $location.url(`/map/view/${$scope.currentTrip}`);
  }
})
