angular.module('spotme').controller('sendLinkCtrl', function($rootScope, $scope, $state, messageService, userService, locationsService){


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
      console.log($scope.locations);
    })

  $scope.sendMessage = function(message){
    console.log($scope.locationId);
    message.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.locationId
    messageService.sendMessage(message)
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
