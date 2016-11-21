angular.module('spotme').controller('campaignsCtrl', function($scope, $state, messageService, userService, locationsService, campaignsService){

  $scope.addCampaignSection = false

  $scope.showAddSection = function(){
    $scope.addCampaignSection = true
  }
  $scope.hideAddSection = function(){
    $scope.addCampaignSection = false
  }
  $scope.submit = function(campaign){
    $scope.addCampaignSection = false
    campaign.userid = userService.user.id
    campaignsService.addCampaign(campaign).then(function(response){
      if (response.status === 200) {
          campaignsService.getCampaigns(userService.user.id).then(function(res){
            $scope.campaigns = res.data.reverse()
          })
        }
    })
  }
  var getCampaigns = function(){
    campaignsService.getCampaigns(userService.user.id).then(function(res){
        $scope.campaigns = res.data.reverse()

    })
  }
  getCampaigns()

  $scope.deleteCampaign = function(campaign){
    campaignsService.deleteCampaign(campaign.id).then(function(res){
      if(res.status === 200){
        getCampaigns()
      }
    })
  }
  $scope.flag = false
  $scope.showUpdate = function(campaign, i){
    if(!$scope.flag){
      $scope.selected = i;
      $scope.name = campaign.name;
      $scope.image = campaign.image;
      $scope.message = campaign.message;
      $scope.status = campaign.status;
      $scope.flag = true;
    }
    else {
      $scope.selected = -1;
      $scope.flag = false;
    }

  }

  $scope.selected = -1

  $scope.updateCampaign = function(campaign){
    $scope.selected = -1
    $scope.flag = false
    campaignsService.updateCampaign(campaign).then(function(res){
      if(res.status === 200){
        getCampaigns()
      }
    })
  }
})
