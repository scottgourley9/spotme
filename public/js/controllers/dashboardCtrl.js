angular.module('spotme').controller('dashboardCtrl', function($auth, $scope, $state, messageService, userService){

  var payload = () => {
      var payloadData = $auth.getPayload()
      userService.user = payloadData.sub
    }
    payload()

$scope.currentUser = userService.user


  
  $scope.logout = function(){
    $auth.logout()
    $state.go('welcome')
  }
})
