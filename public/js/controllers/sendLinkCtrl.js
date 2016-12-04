angular.module('spotme').controller('sendLinkCtrl', function($rootScope, $scope, $state, linksService, messageService, userService, locationsService, campaignsService){

    $scope.linkTypesShowing = false;

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
        $scope.linkTypesShowing = true;

      })
    }

  // $scope.sendMessage = function(message){
  //   campaignsService.getActiveCampaign().then(function(res){
  //     message.message = res.data[0].message
  //     message.image = res.data[0].image
  //     message.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.linkId
  //     messageService.sendMessage(message).then(function(res){
  //       if(res.status === 200){
  //         swal("Sent!", "Message sent successfully", "success")
  //       }
  //     })
  //   })
  //
  // }
  $scope.chooseLinkType = function(link){
    $scope.theLink = link

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
            messageService.addMessage({senttime: user.time, message: user.message, linkid: $scope.theLink.id, userid: userService.user.id, customerid: response.data.id, linktype: $scope.theLink.name}).then(function(messageRes){

              user.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.theLink.id + '/' + response.data.id + '/' + messageRes.data.id

            messageService.sendMessage(user).then(function(resp){
              if(resp.status === 200){
                swal("Sent!", "Message sent successfully", "success")
              }
            })
          })


        })
        }
        else {
          campaignsService.getActiveCampaign().then(function(res){
            user.message = res.data[0].message
            user.image = res.data[0].image
            messageService.addMessage({senttime: user.time, message: user.message, linkid: $scope.theLink.id, userid: userService.user.id, customerid: userService.customer.id, linktype: $scope.theLink.name}).then(function(messageRes){

                user.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.theLink.id + '/' + userService.customer.id + '/' + messageRes.data.id

              messageService.sendMessage(user).then(function(resp){
                if(resp.status === 200){
                  swal("Sent!", "Message sent successfully", "success")
                }
              })
            })


          })
        }
    })
  }


})
