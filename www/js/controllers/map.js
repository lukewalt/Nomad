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
      google.maps.event.addListener(marker, 'dblclick', function () {
        console.log("db");
        marker.setMap(null);
      });

  }
  //creates custom infowindow and obj to push user choice to their spot
  function renderInfoWindow(name, adr, phn ,web) {
    let spot = {}

    let infoView = document.createElement('form');

      let h = document.createElement('h3');
      h.innerText = `${name}`;
      infoView.append(h);
      spot.name = name

      let add = document.createElement('p');
      add.innerText = `${adr}`;
      infoView.append(add)

      let phone = document.createElement('p');;
      phone.innerText = `${phn}`;
      infoView.append(phone);

      let website = document.createElement('a');
      website.setAttribute('href', `${web}`);
      website.innerText = "website";
      infoView.append(website);

    let b = document.createElement('br')
    infoView.append(b)

    let footer = document.createElement('div')
    footer.setAttribute('class', 'infoViewFooter')


      let timeLabel = document.createElement('p')
      timeLabel.innerText = "Time Spent"
      footer.append(timeLabel)

      const arr = ['', 0.5, 1, 2, 3, 4, 5];
      let select = document.createElement('select')
      select.setAttribute('required', 'required')

      for (var i = 0; i < arr.length; i++) {
        let option = document.createElement('option');
           option.value = arr[i];
           option.text = arr[i];
           select.append(option);
      }
      footer.append(select)

      let button = document.createElement('button');
      button.setAttribute('class', 'btn');
      button.innerText = 'Add';
      button.addEventListener('click', () => {
        // let place2 = JSON.parse(JSON.stringify(place))
        spot.timeSpent = select.value
        spot.uid = firebase.auth().currentUser.uid;
        firebase.database().ref('spots').push(spot)
        .then(()=>{
          alert('You Added ' + spot.name + ' to spots')
        })


      })
      footer.append(button);

    infoView.append(footer)

    return infoView;
  }




});
