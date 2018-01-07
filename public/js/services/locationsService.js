angular.module('spotme').service('locationsService', function($http){

  this.addLocation = function(location){
    return $http({
      method: 'POST',
      url: '/api/locations',
      data: location
    })
  }
  this.getLocations = function(userId){
    return $http({
      method: 'GET',
      url: '/api/locations/' + userId
    })
  }
  this.deleteLocation = function(locationId){
    return $http({
      method: 'DELETE',
      url: '/api/locations/' + locationId
    })
  }
  this.updateLocation = function(location){
    return $http({
      method: 'PUT',
      url: '/api/locations/' + location.id,
      data: location
    })
  }

})
