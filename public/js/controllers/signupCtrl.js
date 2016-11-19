angular.module('spotme').controller('signupCtrl', function($scope, $state, userService){
$scope.submit = function(user){
  userService.createUser(user)
}
})
