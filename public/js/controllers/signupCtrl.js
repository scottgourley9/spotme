angular.module('spotme').controller('signupCtrl', function($auth, $scope, $state, userService){
$scope.submit = function(user){
  userService.signUp(user).then(function(response){
    if (response.status === 200) {
        $scope.errorMessage = ''
        $auth.setToken(response)
        $state.go('dashboard')
      }
  })
}
})
