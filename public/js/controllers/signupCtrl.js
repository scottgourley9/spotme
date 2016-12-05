angular.module('spotme').controller('signupCtrl', function($auth, $scope, $state, userService){
$scope.submit = function(){
  userService.signUp($scope.user).then(function(response){
    if (response.status === 200) {
        $scope.errorMessage = ''
        $auth.setToken(response)
        $state.go('dashboard')
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
