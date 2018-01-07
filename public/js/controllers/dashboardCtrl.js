angular.module('spotme').controller('dashboardCtrl', function($auth, $scope, $state, messageService, userService, campaignsService){

$scope.menuHidden = false;
$scope.dashMenu = [];

  var payload = () => {
      var payloadData = $auth.getPayload()
      if (payloadData) {
          userService.user = payloadData.sub
          campaignsService.user = payloadData.sub
      } else {
          $state.go('welcome')
      }

    }
    payload()

$scope.currentUser = userService.user

$scope.hamClick = function(){
  $scope.dashMenu.splice(0)
  if($scope.menuHidden){
    $scope.dashMenu.push('animated slideInDown')
    $scope.menuHidden = !$scope.menuHidden;
  }
  else {
    $scope.dashMenu.push('animated slideOutUp')
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
