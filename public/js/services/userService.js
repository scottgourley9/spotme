angular.module('spotme').service('userService', function($http){
  this.createUser = function(user){
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    })
  }

  this.user;



  this.signUp = user => {
    return $http({
      method: 'POST',
      url: '/auth/signup',
      data: user
    })
  }

  this.login = user => {
    return $http({
      method: 'POST',
      url: '/auth/login',
      data: user
    })
  }
})
