angular.module('spotme').controller('signupCtrl', function(messageService, $auth, $scope, $state, userService){
    document.getElementsByTagName('nav')[0].style.background = '#2e343a';

$scope.theCode = false
$scope.showCode = function(){
  $scope.theCode = !$scope.theCode
}
$scope.submit = function(){
  if(!$scope.user){
    swal("No Input", "All fields are required", 'error')
    return
  }
    if(Object.keys($scope.user).length < 6){
      swal("Missing Field", "All fields are required", 'error')
      return
    }
  console.log('second');
  if(messageService.ValidateEmail($scope.user.email)){
    if(messageService.phonenumber($scope.user.phone)){
      userService.signUp($scope.user).then(function(response){
        if (response.data.message !== 'already taken') {
            // $scope.errorMessage = ''
            $auth.setToken(response)
            $state.go('dashboard/theDashboard')
          }
          else {
            swal("Sorry", "Email and/or phone number is taken", 'error')

          }
      })
    }
  }

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
