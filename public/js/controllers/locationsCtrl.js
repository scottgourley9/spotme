angular.module('spotme').controller('locationsCtrl', function($scope, $state, linksService, messageService, userService, locationsService){

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

  $scope.showAddSection = function(name, address, phonenumber, id){
      $scope.location = {
          name: name,
          address: address,
          phonenumber: phonenumber,
          id: id
      }
      if (id) {
        $scope.isAnEdit = true;
      }
      $scope.overlayShowing = true
  }
  $scope.hideAddSection = function(){
      $scope.overlayShowing = false
      $scope.isAnEdit = false;
  }

  $scope.submit = function(location){
      if ($scope.isAnEdit) {
          $scope.updateLocation(location)
          $scope.isAnEdit = false;
      } else {
          $scope.isAnEdit = false;

    if(messageService.phonenumber(location.phonenumber)){

    $scope.updateInputs = true
    $scope.fakeButton = false
    $scope.selected = -1;
    $scope.flag = false;
    $scope.addLocationSection = false
    location.userid = userService.user.id






    locationsService.addLocation(location).then(function(response){
      if (response.status === 200) {
          // locationsService.getLocations(userService.user.id).then(function(res){
          //   $scope.locations = res.data.reverse()
          // })
          $scope.overlayShowing = false
          getLocations()
        }
    })
  }
}
  }

  var getLocations = function(){
    locationsService.getLocations(userService.user.id).then(function(res){
        var locations = res.data.reverse()
        locations.forEach(function(val){
          val.theMap = 'https://maps.googleapis.com/maps/api/staticmap?center=' + val.lat + ',' + val.lng + '&zoom=18&size=400x400&maptype=satellite&markers=color:red%7C' + val.lat + ',' + val.lng + '&key=AIzaSyDBKFYcusAlV3Ujwcm35vgoxZ6KRXr96Z0'

        })
        $scope.locations = locations
    })
  }
  getLocations()

  $scope.deleteLocation = function(location){
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
    locationsService.deleteLocation(location.id).then(function(res){
      if(res.status === 200){
        getLocations()
      }
    })
  })
  }
  $scope.flag = false
  $scope.showUpdate = function(location, i){
    $scope.updateInputs = true
    $scope.fakeButton = false
    if(!$scope.flag){
      $scope.selected = i;
      $scope.name = location.name;
      $scope.address = location.address;
      $scope.phonenumber = location.phonenumber;
      $scope.link = location.link;
      $scope.flag = true;
    }
    else {
      $scope.selected = -1;
      $scope.flag = false;
    }

  }

  $scope.selected = -1

  $scope.updateLocation = function(location){
    if(messageService.phonenumber(location.phonenumber)){
      $scope.updateInputs = true
      $scope.fakeButton = false
      $scope.selected = -1
      $scope.flag = false
      locationsService.updateLocation(location).then(function(res){
        if(res.status === 200){
          $scope.overlayShowing = false
          getLocations()
        }
      })
    }
  }






})
