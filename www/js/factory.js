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

.factory('gooGeoFactory', ($q, $http) => {
  return {
    distMtx: () => {
      return $http.get(`/googlemapsapi/maps/api/distancematrix/json?units=imperial&origins=place_id:ChIJNT0D7YpmZIgRW_JTBDL7Iwg|place_id:ChIJKZauwUNmZIgRblF0U05TJWI&destinations=place_id:ChIJuY25rS9kZIgRN5MuBAa-JY4|place_id:ChIJ8VhEtvdmZIgRB-GYkpcO89M&key=AIzaSyA7FR9E3bQFP4wWEt_GFRfzr7qxaj-VcKw`)
      .then((val) => console.log(val.data.rows))
    }
    // geoCode: (lat, lng) => {
    //   return $http.get(`/googlemapsapi/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA7FR9E3bQFP4wWEt_GFRfzr7qxaj-VcKw`)
    //   .then((val) => console.log(val);)
    // }
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
      return firebase.database().ref('spots').once('value')
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

.factory('btnFactory', ()=>{
  return {
    CenterControl: function (controlDiv, map, loc) {

      // Set CSS for the control border.
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#ffc900';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '5px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.marginBottom = '22px';
      controlUI.style.textAlign = 'center';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('div');
      controlText.style.color = '#fff';
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      controlText.style.fontSize = '16px';
      controlText.style.lineHeight = '38px';
      controlText.style.paddingLeft = '15px';
      controlText.style.paddingRight = '15px';
      controlText.innerHTML = 'See Day';
      controlUI.appendChild(controlText);

    }
  }
})
