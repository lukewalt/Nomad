contrl.controller('InfoCtrl', function($scope, $stateParams, firebaseFactory){

  $scope.currentCity = $stateParams.city;
  // $scope.currentUser = firebase.auth().currentUser.uid;
  console.log($scope.currentUser);

  const infoRef = firebase.database().ref('info');

  $scope.obj = {};

  $scope.addInfo = () => {
    $scope.obj.city = $scope.currentCity;
    $scope.obj.uid = firebase.auth().currentUser.uid;

    infoRef.push($scope.obj)
    .then(() => $scope.obj.infonote = "")
  }

  infoRef.on("child_added", () => {
    firebaseFactory.getInfo()
    .then((data)=>{
      $scope.data = data
      $scope.$apply()
    })
  })
  infoRef.on("child_removed", () => {
    firebaseFactory.getInfo()
    .then((data)=>{
      $scope.data = data
      $scope.$apply()
    })
  })

  $scope.removeInfoNote = (key) => {
    firebaseFactory.deleteInfo(key)

  }





})
