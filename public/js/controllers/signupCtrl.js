angular.module('spotme').controller('signupCtrl', function($auth, $scope, $state, userService){
$scope.submit = function(){
  userService.signUp($scope.user).then(function(response){
    if (response.data.message !== 'already taken') {
        // $scope.errorMessage = ''
        $auth.setToken(response)
        $state.go('dashboard')
      }
      else {
        swal("Sorry", "Email and/or phone number is taken", 'error')

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
