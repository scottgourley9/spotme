angular.module('spotme').controller('yesOrNoCtrl', function($scope, $state, linksService, messageService, userService, locationsService){
  userService.getUser($state.params.id).then(function(res){
    $scope.user = res.data[0]
linksService.getLink($state.params.linkId).then(function(res){
      $scope.reviewLink = res.data[0]
})
  })



  //  = 'https://www.google.com/search?q=spencer+sprinklers&rlz=1C5CHFA_enUS691US691&oq=spencer+sprinklers&aqs=chrome..69i57.4617j0j1&sourceid=chrome&ie=UTF-8#lrd=0x8752f70050b56229:0x951b6313f154c0bd,3'
})
