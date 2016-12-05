angular.module('spotme').controller('yesOrNoCtrl', function($scope, $state, linksService, messageService, userService, locationsService){

  $scope.yesOrNoSectionShowing = true;
  $scope.noFromSectionShowing = false;
  $scope.thankYouSection = false;


  userService.getUser($state.params.id).then(function(res){
    $scope.user = res.data[0]
linksService.getLink($state.params.linkId).then(function(res){
      $scope.reviewLink = res.data[0].reviewLink
})
  })
  $scope.clickedYes = function(){
    messageService.positive($state.params.messageId)
  }
  $scope.clickedNo = function(){
    $scope.yesOrNoSectionShowing = false;
    $scope.noFromSectionShowing = true;
    $scope.thankYouSection = true;
    messageService.negative($state.params.messageId)

  }

  $scope.submit = function(complaint){
    $scope.yesOrNoSectionShowing = false;
    $scope.noFromSectionShowing = false;
    $scope.thankYouSection = true;
    messageService.complaint($state.params.messageId, complaint)
  }



  //  = 'https://www.google.com/search?q=spencer+sprinklers&rlz=1C5CHFA_enUS691US691&oq=spencer+sprinklers&aqs=chrome..69i57.4617j0j1&sourceid=chrome&ie=UTF-8#lrd=0x8752f70050b56229:0x951b6313f154c0bd,3'
})
