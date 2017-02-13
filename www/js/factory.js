angular.module('starter.factories', [])

.factory('authFactory', ($q) => {
  return {
    registerUser: (email, pass) => {
      return $q.resolve(firebase.auth().createUserWithEmailAndPassword(email, pass))
    },
    userLogin: (email, pass) => {
      return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass))
    }
  }
})

.factory('firebaseFactory', ($q, $http) => {
  return {
    postForm: (form) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/destination/.json`, form));
    },
    getForm: () => {
      return $http.get(`https://frontend-cap.firebaseio.com/.json`)
      .then((val)=> val )
    },
    deleteForm: (key) => {
      return $http.delete(`https://frontend-cap.firebaseio.com/destination/${key}/.json`);
    },
    postInfo: (infonote) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/info.json`, infonote));
    },
    getInfo: () => {
      return $http.get(`https://frontend-cap.firebaseio.com/info.json`)
      .then((val)=> val )
    },
    getFavs: () => {
      return $http.get(`https://frontend-cap.firebaseio.com/fav-spots.json`)
      .then((val)=> val )
    },
    postFav: (item) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/fav-spots.json`, item));
    }
  }
})

.factory('arrFactory', () => {
  return {
    cleanArr: (arr) => {
      let a = [], prev;
      arr.sort()
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== prev) {
              a.push(arr[i]);
          }
          prev = arr[i];
      }
      return a;
    },
    daySum: (arr) => {
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
      }
      return sum
    }
  }
})
