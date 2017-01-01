angular.module('spotme').controller('customersCtrl', function($scope, $state, linksService, messageService, userService, locationsService, campaignsService){

  locationsService.getLocations(userService.user.id).then(function(res){
    $scope.locations = res.data
  })
  $scope.getLinks = function(id){

    linksService.getLinks(id).then(function(res){
      $scope.links = res.data
      $scope.linkTypesShowing = true;

    })
  }
  $scope.theSelected = -1;
    $scope.chooseLinkType = function(link, i){
      $scope.theLink = link
      $scope.theSelected = i


    }
    $scope.theX = function(){
      $scope.popup = !$scope.popup
    }
  $scope.popup = false
  $scope.addCustomerSection = false
  $scope.updateInputs = true
  $scope.fakeButton = false

  $scope.sendMassLinks = function(){
    if(!$scope.massTextArray.length){
      swal("Error", "Must check at least one checkbox", 'error')
      return;
    }
    $scope.popup = !$scope.popup

  }
  $scope.massTextArray = []
  $scope.checkIt = function(customer){
    if(document.getElementById(customer.phonenumber).checked){
      $scope.massTextArray.push(customer)
    }
    else {
      for(var i = 0; i < $scope.massTextArray.length; i++){
        if($scope.massTextArray[i].phonenumber === customer.phonenumber){
          $scope.massTextArray.splice(i, 1)
        }
      }

    }
// console.log($scope.massTextArray);
  }

  $scope.submitMassLink = function(){
    $scope.massTextArray.forEach(function(user){
    user.userid = userService.user.id
    user.time = new Date()
    user.phone = user.phonenumber
    campaignsService.getActiveCampaign().then(function(res){
      userService.getCustomer(userService.user.id, user.phone).then(function(custResp){
        console.log(res.data[0]);
        if(!res.data[0]){
          swal("Error", "No campaign message selected!", "error")
          return
        }
      user.message = res.data[0].message
      user.image = res.data[0].image
      messageService.addMessage({senttime: user.time, message: user.message, linkid: $scope.theLink.id, userid: userService.user.id, customerid: custResp.data[0].id, linktype: $scope.theLink.name}).then(function(messageRes){

          user.link = 'https://www.yes-or-no.info/?one=' + userService.user.id + '&one=' + $scope.theLink.id + '&one='+ custResp.data[0].id + '&one=' + messageRes.data.id

        messageService.sendMessage(user).then(function(resp){
          if(resp.status === 200){
            swal("Sent!", "Message sent successfully", "success")
          }
        })
      })

    })
    })
    })
  }

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
    if(!user || !user.first || !user.last || !user.phone){
      swal("Invalid Input", "Must enter name and phone number", 'error')
      return;
    }
    for(var i = 0; i < $scope.customers.length; i++){
      if($scope.customers[i].phonenumber === user.phone){
        swal("Error", "Existing phone number", 'error')
        return;
      }

    }
    if(messageService.phonenumber(user.phone)){

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
    if(messageService.phonenumber(customer.phone)){

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
  }

  $scope.sendLink = function(customer){
    userService.customer = customer
    $state.go('dashboard.sendLink')
  }




})
