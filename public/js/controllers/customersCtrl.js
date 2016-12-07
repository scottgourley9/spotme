angular.module('spotme').controller('customersCtrl', function($scope, $state, messageService, userService){

  $scope.addCustomerSection = false
  $scope.updateInputs = true
  $scope.fakeButton = false

  $scope.cancel = function(){
    $scope.selected = -1
    $scope.flag = false
    $scope.updateInputs = true
    $scope.fakeButton = false
  }

  $scope.fakeUpdate = function(){
    $scope.updateInputs = false
    $scope.fakeButton = true
  }

  $scope.showAddSection = function(){
    $scope.addCustomerSection = true
  }
  $scope.hideAddSection = function(){
    $scope.addCustomerSection = false
  }
  $scope.submit = function(user){
    for(var i = 0; i < $scope.customers.length; i++){
      if($scope.customers[i].phonenumber === user.phone){
        swal("Error", "Invalid email and/or password", 'error')
        return;
      }

    }
    $scope.updateInputs = true
    $scope.fakeButton = false
    $scope.selected = -1;
    $scope.flag = false;
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
    swal({
  title: "Are you sure?",
  text: "You will not be able to recover this information!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, delete it!",
  closeOnConfirm: false
},
function(){
  swal("Deleted!", "Successfully deleted.", "success");
    $scope.selected = -1;
    $scope.flag = false;
    $scope.updateInputs = true
    $scope.fakeButton = false
    userService.deleteCustomer(customer.id).then(function(res){
      if(res.status === 200){
        getCustomers()
      }
    })
  })
  }
  $scope.flag = false
  $scope.showUpdate = function(customer, i){
    $scope.updateInputs = true
    $scope.fakeButton = false
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

    $scope.updateInputs = true
    $scope.fakeButton = false
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
