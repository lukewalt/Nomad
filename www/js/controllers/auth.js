contrl.controller('AuthCtrl', function($scope, $timeout, $ionicModal, $q, $http, $location) {

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/auth.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };


  // Form data for the login modal
  $scope.loginData = {};
  // Perform the login action when the user submits the login form
  $scope.doLogin = () => {
      $location.url('/menu')
  }
  console.log('login fired', $scope.loginData)
  // Simulate a login delay. Remove this and replace with your login
  // code if using a login system
  $timeout(function() {
    $scope.closeLogin();
  }, 1000)


})
