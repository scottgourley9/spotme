angular.module('spotme').controller('updateLinksCtrl', function($scope, $state, linksService, messageService, userService, locationsService){
$scope.forAddress = $state.params.address

$scope.addLocationSection = false
$scope.updateInputs = true
$scope.fakeButton = false

$scope.fakeUpdate = function(){
  $scope.updateInputs = false
  $scope.fakeButton = true
}

$scope.cancel = function(){
  $scope.selected = -1;
  $scope.flag = false;
  $scope.updateInputs = true
  $scope.fakeButton = false
}

$scope.showAddSection = function(){
  $scope.addLocationSection = true
}
$scope.hideAddSection = function(){
  $scope.addLocationSection = false
}
$scope.submit = function(link){
  $scope.updateInputs = true
  $scope.fakeButton = false
  $scope.selected = -1;
  $scope.flag = false;
  $scope.addLocationSection = false
  link.locationId = $state.params.id;
  linksService.addLink(link).then(function(res){
    if(res.status === 200){
      getLinks()
    }
  })
}
var getLinks = function(){
  linksService.getLinks($state.params.id).then(function(res){
    $scope.links = res.data.reverse();
  })
}
getLinks()

$scope.deleteLink = function(link){
  $scope.updateInputs = true
  $scope.fakeButton = false
  $scope.selected = -1;
  $scope.flag = false;
  linksService.deleteLink(link.id).then(function(res){
    if(res.status === 200){
      getLinks()
    }
  })
}
$scope.flag = false
$scope.showUpdate = function(link, i){
  $scope.updateInputs = true
  $scope.fakeButton = false
  if(!$scope.flag){
    $scope.selected = i;
    $scope.name = link.name;
    $scope.myLink = link.reviewlink;
    $scope.flag = true;
  }
  else {
    $scope.selected = -1;
    $scope.flag = false;
  }

}

$scope.selected = -1

$scope.updateLink = function(link){
  $scope.updateInputs = true
  $scope.fakeButton = false
  $scope.selected = -1
  $scope.flag = false
  linksService.updateLink(link).then(function(res){
    if(res.status === 200){
      getLinks()
    }
  })
}



})
