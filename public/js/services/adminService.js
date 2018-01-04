angular.module('spotme').service('adminService', function($http){
  this.getAllUsers = function(){
    return $http({
      method: 'GET',
      url: '/admin/getusers',
      headers: {'Authorization': localStorage.getItem('satellizer_token')}
    })
  }
  this.getCustomers = function(userid){
    return $http({
      method: 'GET',
      url: '/api/customers/' + userid
    })
  }
  this.getCustomer = function(userid, phone){
    return $http({
      method: 'GET',
      url: '/api/customer/' + userid + '/' + phone
    })
  }

  this.getUser = function(userid){
    return $http({
      method: 'GET',
      url: '/api/user/' + userid
    })
  }
  this.updateUser = function(obj){
    return $http({
      method: 'PUT',
      url: '/api/user/' + this.user.id,
      data: obj
    })
  }

  this.deleteCustomer = function(customerId){
    return $http({
      method: 'DELETE',
      url: '/api/customers/' + customerId
    })
  }
  this.updateCustomer = function(customer){
    return $http({
      method: 'PUT',
      url: '/api/customers/' + customer.id,
      data: customer
    })
  }

  this.user;
  this.customer;

  this.checkPass = function(input){
    return $http({
      method: "POST",
      url: '/api/password/' + this.user.id,
      data: {input: input}
    })
  }
  this.changePassword = function(input2){
    return $http({
      method: "PUT",
      url: '/api/password/' + this.user.id,
      data: {input2: input2}
    })
  }
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
