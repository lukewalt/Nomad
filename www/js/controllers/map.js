contrl.controller('GoogleMapCtrl', function($scope, $state, $cordovaGeolocation) {

  //sets high accuracy
  let options = {timeout: 10000, enableHighAccuracy: true};

  //DEVICE LOCATION: gets ^ options then it fires a function with a position of device
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    //sets device location to a google lat-lng and saves it as a variable
    let currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // establishes current options for current view
    let mapOptions = {
      center: currentLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };

    //NEW MAP:  sets options and display target for a new map to scope
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);



    //DROPS MARKER: drops marker on current location
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      let marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: currentLatLng
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
    });


  },
  //runs if cordova geolocation doesnt get current location
  function(error){
    console.log("Could not get location");
  });


  //attaches autho complete to imnput field
  const userSearchField = document.getElementById('autocomplete')
  $scope.clearSearchField = () => { userSearchField.value = " " }
  const ac = new google.maps.places.Autocomplete(userSearchField);

  google.maps.event.addListener(ac, 'place_changed', function() {
    let place = ac.getPlace();
    console.log(place);
    searchMarker = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng())
    dropPin(searchMarker, place);

  })

  function dropPin(location, place) {
    console.log(location);

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: location
      });

      let infoWindow = new google.maps.InfoWindow({
          content: renderInfoWindow(place.name, place.formatted_address, place.formatted_phone_number, place.website)
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });
  }

  function renderInfoWindow(name, adr, phn ,web) {

    let spot = {}

    let div = document.createElement('div');

    let h = document.createElement('h3');
    h.innerText = `${name}`;
    div.append(h);
    spot.name = name

    let add = document.createElement('p');
    add.innerText = `${adr}`;
    div.append(add)

    let phone = document.createElement('p');;
    phone.innerText = `${phn}`;
    div.append(phone);

    let website = document.createElement('a');
    website.setAttribute('href', `${web}`);
    website.innerText = "website";
    div.append(website);

    let b = document.createElement('br')
    div.append(b)

    let button = document.createElement('button');
    button.innerText = 'Add';
    button.addEventListener('click', () => {
      // let place2 = JSON.parse(JSON.stringify(place))
      spot.uid = firebase.auth().currentUser.uid;
      firebase.database().ref('spots').push(spot)

    })
    div.append(button);

    return div;
  }




});
