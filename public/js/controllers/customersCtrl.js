angular.module('spotme').controller('customersCtrl', function($scope, $state, messageService, userService){

  $scope.addCustomerSection = false

  $scope.showAddSection = function(){
    $scope.addCustomerSection = true
  }
  $scope.hideAddSection = function(){
    $scope.addCustomerSection = false
  }
  $scope.submit = function(user){
    $scope.addCustomerSection = false
    user.userid = userService.user.id
    userService.addCustomer(user).then(function(response){
      if (response.status === 200) {
          userService.getCustomers(userService.user.id).then(function(res){
            $scope.customers = res.data.reverse()
          })
        }
    })
  }
  var getCustomers = function(){
    userService.getCustomers(userService.user.id).then(function(res){
        $scope.customers = res.data.reverse()

    })
  }
  getCustomers()

  $scope.deleteCustomer = function(customer){
    userService.deleteCustomer(customer.id).then(function(res){
      if(res.status === 200){
        getCustomers()
      }
    })
  }
  $scope.flag = false
  $scope.showUpdate = function(customer, i){
    if(!$scope.flag){
      $scope.selected = i;
      $scope.first = customer.firstname;
      $scope.last = customer.lastname;
      $scope.phone = customer.phonenumber;
      $scope.email = customer.email;
      $scope.flag = true;
    }
    else {
      $scope.selected = -1;
      $scope.flag = false;
    }

  }

  $scope.selected = -1

  $scope.updateCustomer = function(customer){
    $scope.selected = -1
    $scope.flag = false
    userService.updateCustomer(customer).then(function(res){
      if(res.status === 200){
        getCustomers()
      }
    })
  }

  $scope.sendLink = function(customer){
    userService.customer = customer
    $state.go('dashboard.sendLink')
  }




})
