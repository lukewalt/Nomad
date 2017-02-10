contrl.controller('InfoCtrl', function($scope, $stateParams, firebaseFactory){

  $scope.currentCity = $stateParams.city

  $scope.obj = {
    city : $scope.currentCity
  };

  $scope.addInfo = () => {
    console.log($scope.obj.infonote);
    firebaseFactory.postInfo($scope.obj)
    .then(() => $scope.obj.infonote = null)
  }

})
