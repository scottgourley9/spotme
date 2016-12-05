angular.module('spotme').controller('locationsCtrl', function($scope, $state, linksService, messageService, userService, locationsService){

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

  $scope.submit = function(location){
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
          getLocations()
        }
    })
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

  $scope.deleteLocation = function(customer){
    $scope.updateInputs = true
    $scope.fakeButton = false
    $scope.selected = -1;
    $scope.flag = false;
    locationsService.deleteLocation(customer.id).then(function(res){
      if(res.status === 200){
        getLocations()
      }
    })
  }
  $scope.flag = false
  $scope.showUpdate = function(location, i){
    $scope.updateInputs = true
    $scope.fakeButton = false
    if(!$scope.flag){
      $scope.selected = i;
      $scope.address = location.address;
      $scope.phone = location.phonenumber;
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
    $scope.updateInputs = true
    $scope.fakeButton = false
    $scope.selected = -1
    $scope.flag = false
    locationsService.updateLocation(location).then(function(res){
      if(res.status === 200){
        getLocations()
      }
    })
  }






})
