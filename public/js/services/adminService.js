angular.module('spotme').service('adminService', function($http){
  this.getAllUsers = function(){
    return $http({
      method: 'GET',
      url: '/admin/getusers',
      headers: {'Authorization': localStorage.getItem('satellizer_token')}
    })
  }
  this.getUserById = function(id){
    return $http({
      method: 'GET',
      url: '/admin/getuser/' + id,
      headers: {'Authorization': localStorage.getItem('satellizer_token')}
    })
  }
  this.updateUser = function(newUser){
    return $http({
      method: 'PUT',
      url: '/admin/updateuser',
      headers: {'Authorization': localStorage.getItem('satellizer_token')},
      data: newUser
    })
  }

})
