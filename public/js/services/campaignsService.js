angular.module('spotme').service('campaignsService', function($http){

  this.user;

  this.addCampaign = function(campaign){
    return $http({
      method: 'POST',
      url: '/api/campaigns',
      data: campaign
    })
  }
  this.getCampaigns = function(userId){
    return $http({
      method: 'GET',
      url: '/api/campaigns/' + userId
    })
  }
  this.deleteCampaign = function(campaignId){
    return $http({
      method: 'DELETE',
      url: '/api/campaigns/' + campaignId
    })
  }
  this.updateCampaign = function(campaign){
    return $http({
      method: 'PUT',
      url: '/api/campaigns/' + campaign.id,
      data: campaign
    })
  }

  this.updateCampaignStatus = function(campaignId){
    return $http({
      method: 'PUT',
      url: '/api/updatecampaignstatus/' + campaignId,
      data: {userid: this.user.id}
    })
  }

  this.getActiveCampaign = function(){
    return $http({
      method: 'GET',
      url: '/api/getactivecampaign/' + this.user.id
    })
  }

  this.uploadPhoto = function(obj) {
      return $http({
          method: 'POST',
          url: '/api/uploadphoto',
          data: obj
      })
  }

})
