angular.module('starter.factories', [])

.factory('authFactory', ($q) => {
  return {
    registerUser: (email, pass) => {
      return $q.resolve(firebase.auth().createUserWithEmailAndPassword(email, pass))
    },
    userLogin: (email, pass) => {
      return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass))
    },
    getUser: () => {
      return $q((resolve, reject) => {
        // http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe()
          if (user) {
            resolve(user)
          } else {
            reject(console.log('reject'))
          }
        })
      })
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
