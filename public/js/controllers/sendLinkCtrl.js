angular.module('spotme').controller('sendLinkCtrl', function($rootScope, $scope, $state, messageService, userService, locationsService, campaignsService){


    if(userService.customer){
      $scope.first = userService.customer.first
      $scope.last = userService.customer.last
      $scope.phone = userService.customer.phone
      $scope.email = userService.customer.email
    }
    $rootScope.$on('$stateChangeSuccess', function(){
      if($state.current.name !== 'dashboard.sendLink'){
        userService.customer = ''
      }
    })

    locationsService.getLocations(userService.user.id).then(function(res){
      $scope.locations = res.data
    })

  $scope.sendMessage = function(message){
    campaignsService.getActiveCampaign().then(function(res){
      message.message = res.data[0].message
      message.image = res.data[0].image
      message.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.locationId
      messageService.sendMessage(message).then(function(res){
        if(res.status === 200){
          swal("Sent!", "Message sent successfully", "success")
        }
      })
    })

  }

  $scope.submit = function(user){
    $scope.addCustomerSection = false
    user.userid = userService.user.id
    user.time = new Date()
    userService.addCustomer(user).then(function(response){
      // if (response.status === 200) {
      //     userService.getCustomers(userService.user.id).then(function(res){
      //       $scope.customers = res.data.reverse()
      //     })
      //   }
    })
  }


})
