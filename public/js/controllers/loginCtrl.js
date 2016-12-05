angular.module('spotme').controller('loginCtrl', function($scope, $state, userService, $auth){
$scope.submit = function(){
  userService.login($scope.user).then(function(response){
    if (response.status === 200) {
      $auth.setToken(response)
      $state.go('dashboard.theDashboard')
    }
    else {
      alert('Either the password or email is incorrect')
    }
  })
}
$scope.cancel = function(){
  $state.go('welcome')
}

$scope.enter = function(e){
  if(e.keyCode === 13){
    $scope.submit()
  }
}

})
