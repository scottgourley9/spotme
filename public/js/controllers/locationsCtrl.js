angular.module('spotme').controller('locationsCtrl', function($scope, $state, messageService, userService, locationsService){

  $scope.addLocationSection = false

  $scope.showAddSection = function(){
    $scope.addLocationSection = true
  }
  $scope.hideAddSection = function(){
    $scope.addLocationSection = false
  }
  $scope.submit = function(location){
    $scope.addLocationSection = false
    location.userid = userService.user.id
    locationsService.addLocation(location).then(function(response){
      if (response.status === 200) {
          locationsService.getLocations(userService.user.id).then(function(res){
            $scope.locations = res.data.reverse()
          })
        }
    })
  }
  var getLocations = function(){
    locationsService.getLocations(userService.user.id).then(function(res){
        $scope.locations = res.data.reverse()

    })
  }
  getLocations()

  $scope.deleteLocation = function(customer){
    locationsService.deleteLocation(customer.id).then(function(res){
      if(res.status === 200){
        getLocations()
      }
    })
  }
  $scope.flag = false
  $scope.showUpdate = function(location, i){
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
    $scope.selected = -1
    $scope.flag = false
    locationsService.updateLocation(location).then(function(res){
      if(res.status === 200){
        getLocations()
      }
    })
  }
})
