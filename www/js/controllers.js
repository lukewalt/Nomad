angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $timeout, $ionicModal, $q, $http, $location) {

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

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogout = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.logout = function() {
    $scope.modal.show();
  };


})

.controller('FormCtrl', function($scope, $location, firebaseFactory) {
  //empty object
  $scope.day = {}

  //takes input values and creates a "day" object in firebase
  $scope.createForm = () => {
    console.log($scope.day);
    firebaseFactory.postForm($scope.day, $scope.day.city, $scope.day.day)
    .then(() => $scope.day = {})
  }

  //takes user to see their day
  $scope.goToDay = () => {
    console.log("got to day");
    $location.url('/day')
  }

})

.controller('TripsCtrl', function($scope, firebaseFactory){

  //gets forms and sets the objs to scope
  firebaseFactory.getForm()
    .then((val) => {
      $scope.forms = val.data
      console.log($scope.forms);
    })
})

.controller('CityCtrl', function($scope, $stateParams ,firebaseFactory){

  firebaseFactory.getForm()
    .then((val) => {
      $scope.form = val.data
      console.log($scope.form);
    })

  $scope.currentCity = $stateParams.city
})

.controller('DaysCtrl', function($scope, $stateParams, firebaseFactory){
  $scope.currentCity = $stateParams.city

    firebaseFactory.getForm()
      .then((val) => {
        $scope.form = val.data[$scope.currentCity]
        console.log($scope.form);
      })

})
