angular.module('spotme').controller('dashboardCtrl', function($auth, $scope, $state, messageService, userService, campaignsService){

$scope.menuHidden = true;
$scope.dashMenu = [];

  var payload = () => {
      var payloadData = $auth.getPayload()
      userService.user = payloadData.sub
      campaignsService.user = payloadData.sub
    }
    payload()

$scope.currentUser = userService.user

$scope.hamClick = function(){
  $scope.dashMenu.splice(0)
  if($scope.menuHidden){
    $scope.dashMenu.push('animated bounceInDown')
    $scope.menuHidden = !$scope.menuHidden;
  }
  else {
    $scope.dashMenu.push('animated bounceOutUp')
    setTimeout(function(){
      $scope.menuHidden = !$scope.menuHidden;
    }, 500)
  }

}

  $scope.logout = function(){
    $auth.logout()
    $state.go('welcome')
  }
})
