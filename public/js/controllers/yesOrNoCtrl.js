angular.module('spotme').controller('yesOrNoCtrl', function($scope, $state, messageService, userService, locationsService){

  locationsService.getLocations($state.params.id).then(function(res){
    for(var i = 0; i < res.data.length; i++){
      if(res.data[i].id == $state.params.locationId){
        $scope.reviewLink = res.data[i].link
      }
    }
  })
  //  = 'https://www.google.com/search?q=spencer+sprinklers&rlz=1C5CHFA_enUS691US691&oq=spencer+sprinklers&aqs=chrome..69i57.4617j0j1&sourceid=chrome&ie=UTF-8#lrd=0x8752f70050b56229:0x951b6313f154c0bd,3'
})
