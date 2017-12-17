angular.module('spotme').controller('updateLinksCtrl', function($scope, $state, linksService, messageService, userService, locationsService){
$scope.forAddress = $state.params.address

$scope.addLocationSection = false
$scope.updateInputs = true
$scope.fakeButton = false
$scope.overlayShowing = false
$scope.isAnEdit = false

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

$scope.showAddSection = function(name, reviewlink, id){
    $scope.link = {
        name: name,
        reviewlink: reviewlink,
        id: id
    }
    if (reviewlink) {
      $scope.isAnEdit = true;
    }
    $scope.overlayShowing = true
}
$scope.hideAddSection = function(){
    $scope.overlayShowing = false
    $scope.isAnEdit = false
}
$scope.submit = function(link){
    if($scope.isAnEdit){
        $scope.updateLink($scope.link)
        $scope.isAnEdit = false;
    } else {
        $scope.isAnEdit = false;
  $scope.updateInputs = true
  $scope.fakeButton = false
  $scope.selected = -1;
  $scope.flag = false;
  $scope.addLocationSection = false
  link.locationId = $state.params.id;
  linksService.addLink(link).then(function(res){
    if(res.status === 200){
        $scope.overlayShowing = false
      getLinks()
    }
  })
}
}
var getLinks = function(){
  linksService.getLinks($state.params.id).then(function(res){
    $scope.links = res.data.reverse();
  })
}
getLinks()

$scope.deleteLink = function(link){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this information!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
    },
    function(){
    swal("Deleted!", "Successfully deleted.", "success");
      $scope.updateInputs = true
      $scope.fakeButton = false
      $scope.selected = -1;
      $scope.flag = false;
      linksService.deleteLink(link.id).then(function(res){
        if(res.status === 200){
          getLinks()
        }
      })
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
        $scope.overlayShowing = false
      getLinks()
    }
  })
}



})
