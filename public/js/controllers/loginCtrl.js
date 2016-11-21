angular.module('spotme').controller('loginCtrl', function($scope, $state, userService, $auth){
$scope.submit = function(user){
  userService.login(user).then(function(response){
    if (response.status === 200) {
      $auth.setToken(response)
      $state.go('dashboard.theDashboard')
    }
    else {
      alert('Either the password or email is incorrect')
    }
  })
}


})
