angular.module('spotme').service('linksService', function($http){


  this.getLinks = function(id){
    return $http({
      method: 'GET',
      url: '/api/links/' + id
    })
  }

  this.getLink = function(linkId){
    return $http({
      method: 'GET',
      url: '/api/links/' + linkId
    })
  }


  this.addLink = function(link){
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link
    })
  }

  this.updateLink = function(link){
    return $http({
      method: 'PUT',
      url: '/api/links',
      data: link
    })
  }

  this.deleteLink = function(id){
    return $http({
      method: 'DELETE',
      url: '/api/links/' + id
    })
  }




})
