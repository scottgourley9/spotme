angular.module('spotme').service('messageService', function($http){
  this.sendMessage = function(obj){
    return $http({
      method: 'POST',
      url: '/api/sendmessage',
      data: obj
    })
  }

  this.addMessage = function(obj){
    return $http({
      method: 'POST',
      url: '/api/messages',
      data: obj
    })
  }
})
