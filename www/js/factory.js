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
    getCities: () => {
      return $http.get(`https://frontend-cap.firebaseio.com/destination.json`)
      .then((val)=> val )
    },
    getForm: () => {
      return firebase.database().ref('destination').once('value')
      .then((snap)=> snap.val())
    },
    deleteForm: (key) => {
      return firebase.database().ref('destination').child(key).remove()
    },
    deleteInfo: (key) => {
      return firebase.database().ref('info').child(key).remove()
    },

    getInfo: () => {
      return firebase.database().ref('info').once('value')
      .then((snap)=> snap.val())
    },

    postFav: (item) => {
      return $q.resolve($http.post(`https://frontend-cap.firebaseio.com/fav-spots.json`, item));
    },
    getFavs: () => {
      return firebase.database().ref('fav-spots').once('value')
      .then((snap)=> snap.val())
    },
    deleteFav: (key) => {
      return firebase.database().ref('fav-spots').child(key).remove()
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
