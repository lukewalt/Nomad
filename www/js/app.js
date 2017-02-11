// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories'])




.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.form', {
    url: '/form',
    views: {
      'menuContent': {
        templateUrl: 'templates/form.html',
        controller: 'FormCtrl'
      }
    }
  })
  .state('app.trips', {
    url: '/trips',
    views: {
      'menuContent': {
        templateUrl: 'templates/trips.html',
        controller: 'TripsCtrl'
      }
    }
  })

  .state('app.city', {
      url: '/trips/:city',
      views: {
        'menuContent': {
          templateUrl: 'templates/city.html',
          controller: 'CityCtrl'
        }
      }
    })

  .state('app.spots', {
    url: '/trips/:city/spots',
    views: {
      'menuContent': {
        templateUrl: 'templates/spots.html',
        controller: 'SpotCtrl'
      }
    }
  })
  .state('app.info', {
    url: '/trips/:city/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/tripinfo.html',
        controller: 'InfoCtrl'
      }
    }
  })
  .state('app.fav', {
    url: '/trips/:city/fav-spots',
    views: {
      'menuContent': {
        templateUrl: 'templates/fav.html',
        controller: 'FavCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/form');
});
