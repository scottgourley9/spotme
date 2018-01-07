angular.module('spotme').service('paymentService', function($http){

  this.sendPayment = function(paymentInfo){
    return $http({
      method: 'POST',
      url: '/api/payment',
      data: paymentInfo
    })
  }
})
