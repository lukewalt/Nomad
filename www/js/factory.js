angular.module('starter.factories', [])

.factory('firebaseFactory', function($q, $http){
  return {
    postForm: (form) => {
      return $q.resolve($http.post('https://frontend-cap.firebaseio.com/forms/.json', form));
    },
    getForm: (form) => {
      return $http.get(`https://frontend-cap.firebaseio.com/.json`)
    }
  }
})
