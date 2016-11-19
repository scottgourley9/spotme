angular.module('spotme').controller('dashboardCtrl', function($auth, $scope, $state, messageService, userService){

  var payload = () => {
      var payloadData = $auth.getPayload()
      userService.user = payloadData.sub
    }
    payload()

$scope.test = userService.user


  $scope.sendMessage = function(message){

    messageService.sendMessage(message)
  }
  $scope.logout = function(){
    $auth.logout()
    $state.go('welcome')
  }
})
