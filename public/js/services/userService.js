angular.module('spotme').service('userService', function($http){
  this.createUser = function(user){
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    })
  }

  this.login = function(user){
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    })
  }
})
