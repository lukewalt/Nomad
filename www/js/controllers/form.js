contrl.controller('FormCtrl', function($scope, $location, firebaseFactory) {
  //empty object
  $scope.day = {}

  //takes input values and creates a "day" object in firebase
  $scope.createForm = () => {
    console.log($scope.day);
    firebaseFactory.postForm($scope.day)
    .then(() => {
      $scope.city = $scope.day.city
      console.log($scope.city);
      $scope.viewDay = true
    })
    .then(() => $scope.day = {})
  }

  //takes user to see their day
  $scope.goToDay = () => {
    console.log($scope.city);
    if ($scope.city === undefined) {
      $scope.viewDay = false
    } else {
      
      $location.url(`/app/trips/${$scope.city}/spots`);
    }
  }



})
