angular.module('starter.factories', [])

.factory('firebaseFactory', function($q, $http){
  return {
    postForm: (form, city) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/${city}/.json`, form));
    },
    getForm: (form) => {
      return $http.get(`https://frontend-cap.firebaseio.com/.json`)
      .then((val)=> val )
    }
  }
})
