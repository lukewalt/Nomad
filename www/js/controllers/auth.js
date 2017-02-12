
firebase.initializeApp({
    apiKey: "AIzaSyDQRfBKyHDrPXJYhxnFi5r6opLorg0K5wY",
    authDomain: "frontend-cap.firebaseapp.com",
    databaseURL: "https://frontend-cap.firebaseio.com",
    storageBucket: "frontend-cap.appspot.com",
    messagingSenderId: "468124490040"
})


contrl.controller('AuthCtrl', function($scope, $timeout, $ionicModal, $q, $http, $location) {

  // Create the register modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.registerModal = function() {
    $scope.modal.show();
  };
  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.modal.hide();
  };


  // Form data for the login modal
  $scope.regData = {};
  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doRegister = () => {
    console.log('login fired', $scope.regData)
        $scope.modal.hide();

  }
  $scope.doLogin = () => {
    console.log('login fired', $scope.loginData)

  }
  // Simulate a login delay. Remove this and replace with your login
  // code if using a login system
  $timeout(function() {
    $scope.closeRegister();
  }, 1000)



})
