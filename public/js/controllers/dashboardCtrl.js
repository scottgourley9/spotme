angular.module('spotme').controller('dashboardCtrl', function($scope, $state, messageService){
  $scope.sendMessage = function(message){
    
    messageService.sendMessage(message)
  }
})
