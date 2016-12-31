angular.module('spotme').controller('paymentCtrl', function($scope, paymentService, userService){
  $scope.stripeCallback = function (code, result) {
    if (result.error) {
        swal("Sorry", "There was an error", "error");
    } else {
        paymentService.sendPayment({amount: document.getElementById('amount').value, token: result.id, customerId: userService.user.id, receipt_email: userService.user.email}).then(function(res){
          if(res.data === 'success'){
            swal("Success", "Payment successful!", "success");
          }
          else {
            swal("Sorry", "There was an error", "error");
          }
        })
    }
};
})
