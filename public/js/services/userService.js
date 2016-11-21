angular.module('spotme').service('userService', function($http){
  this.addCustomer = function(user){
    return $http({
      method: 'POST',
      url: '/api/customers',
      data: user
    })
  }
  this.getCustomers = function(userid){
    return $http({
      method: 'GET',
      url: '/api/customers/' + userid
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
