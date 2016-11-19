angular.module('spotme').controller('loginCtrl', function($scope, $state, userService){
$scope.submit = function(user){
  userService.login(user).then(function(res){
    if(res.data.found){
      $state.go('dashboard.theDashboard')
    }
    else {
      alert('Either the password or email is incorrect')
    }
  })
}
})
