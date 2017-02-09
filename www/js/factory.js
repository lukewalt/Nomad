angular.module('starter.factories', [])

.factory('firebaseFactory', function($q, $http){
  return {
    postForm: (form) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/destination/.json`, form));
    },
    getForm: () => {
      return $http.get(`https://frontend-cap.firebaseio.com/.json`)
      .then((val)=> val )
    },
    postInfo: (infonote) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/info/.json`, infonote));
    },
    getInfo: () => {
      return $http.get(`https://frontend-cap.firebaseio.com/info.json`)
      .then((val)=> val )
    }
  }
})
