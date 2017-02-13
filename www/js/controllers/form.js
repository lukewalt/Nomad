contrl.controller('FormCtrl', function($scope, $location, firebaseFactory) {
  //empty object
  $scope.day = {}

  //takes input values and creates a "day" object in firebase
  $scope.createForm = () => {
    $scope.day.uid = firebase.auth().currentUser.uid;
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

  // var onSuccess = (position) => {
  //   console.log('Latitude: '          + position.coords.latitude          + '\n' +
  //               'Longitude: '         + position.coords.longitude         + '\n' +
  //               'Altitude: '          + position.coords.altitude          + '\n' +
  //               'Accuracy: '          + position.coords.accuracy          + '\n' +
  //               'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
  //               'Heading: '           + position.coords.heading           + '\n' +
  //               'Speed: '             + position.coords.speed             + '\n' +
  //               'Timestamp: '         + position.timestamp                + '\n');
  //   }
  //
  //     // onError Callback receives a PositionError object
  //     //
  // var onError = (error) => {
  //         console.log('code: '    + error.code    + '\n' +
  //               'message: ' + error.message + '\n');
  //     }
  //
  // navigator.geolocation.getCurrentPosition(onSuccess, onError);

})
