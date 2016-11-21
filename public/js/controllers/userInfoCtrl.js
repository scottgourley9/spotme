angular.module('spotme').controller('userInfoCtrl', function($scope, $state, messageService, userService){
  $scope.userInfo = userService.user
})
