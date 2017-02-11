contrl.controller('InfoCtrl', function($scope, $stateParams, firebaseFactory){

  $scope.currentCity = $stateParams.city
  const infoRef = firebase.database().ref('info');
  let infoArr = [];
  let infoKey = [];

  $scope.obj = {
    city : $scope.currentCity
  };

  $scope.addInfo = () => {

    infoRef.push($scope.obj)
    .then(() => $scope.obj.infonote = null )
  }

  firebaseFactory.getInfo()
  .then((val) => {
    //gets all objects from info
    const infonotes = val.data
    angular.forEach(infonotes, (v, k) => {
      //extracts only notes in current city
      if (v.city === $scope.currentCity) {
        infoArr.push(v)
        infoKey.push(k)
      }

    })
    $scope.info = infoArr
    console.log($scope.info);
    $scope.infoKey = infoKey;
    console.log($scope.infoKey);


  })

})
