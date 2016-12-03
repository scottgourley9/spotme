angular.module('spotme').controller('sendLinkCtrl', function($rootScope, $scope, $state, linksService, messageService, userService, locationsService, campaignsService){


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
    $scope.getLinks = function(id){
      linksService.getLinks(id).then(function(res){
        $scope.links = res.data
      })
    }

  $scope.sendMessage = function(message){
    campaignsService.getActiveCampaign().then(function(res){
      message.message = res.data[0].message
      message.image = res.data[0].image
      message.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.linkId
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
      if (response.data !== 'customer already exists') {
        campaignsService.getActiveCampaign().then(function(res){
          user.message = res.data[0].message
          user.image = res.data[0].image
          user.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.linkId + '/' + response.data.id
          messageService.sendMessage(user).then(function(resp){
            if(resp.status === 200){
              swal("Sent!", "Message sent successfully", "success")
              messageService.addMessage({senttime: user.time, message: user.message, link: user.link, linkname: res.data, userid: userService.user.id, customerid: response.data.id})
            }
          })
        })
        }
        else {
          campaignsService.getActiveCampaign().then(function(res){
            user.message = res.data[0].message
            user.image = res.data[0].image
            user.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.linkId + '/' + userService.customer.id
            messageService.sendMessage(user).then(function(resp){
              if(resp.status === 200){
                swal("Sent!", "Message sent successfully", "success")
                messageService.addMessage({senttime: user.time, message: user.message, link: user.link, linkname: res.data, userid: userService.user.id, customerid: userService.customer.id})
              }
            })
          })
        }
    })
  }


})
