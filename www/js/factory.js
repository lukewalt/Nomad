angular.module('starter.factories', [])

.factory('firebaseFactory', function($q, $http){
  return {
    postForm: (form) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/day/.json`, form));
    },
    getForm: () => {
      return $http.get(`https://frontend-cap.firebaseio.com/.json`)
      .then((val)=> val )
    },
    postRes: (values) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/reservations/.json`, values));
    }
  }
})
