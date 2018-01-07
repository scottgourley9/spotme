angular.module('spotme').controller('loginCtrl', function($scope, $state, userService, $auth){
$('nav ul li').css({color: '#000000'});
$('.menu-items-nav').css({backgroundColor: '#ffffff'});

$scope.submit = function(){
  userService.login($scope.user).then(function(response){
    if (response.data.message !== 'Invalid email and/or password' && response.data.message !== 'Your free trial is over') {
        $auth.setToken(response)
        $state.go('dashboard.theDashboard')
    } else if (response.data.message === 'Your free trial is over') {
        swal("Error", "Your free trial has ended. Please contact us to access you account", 'error');
    } else if (response.data.message === 'Invalid email and/or password') {
        swal("Error", "Invalid email and/or password", 'error');
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

$scope.forgotPassword = () => {
        userService.forgotPassword();
    }


})
