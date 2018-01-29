angular.module('spotme').controller('campaignsCtrl', function($scope, $state, messageService, userService, locationsService, campaignsService) {

    $scope.addCampaignSection = false
    $scope.updateInputs = true
    $scope.fakeButton = false
    $scope.overlayShowing = false
    $scope.isAnEdit = false
    $scope.showLoader = false
    if ($scope.campaign && $scope.campaign.image) {
        $scope.showCampaignImg = true
    } else {
        $scope.showCampaignImg = false
    }
    $scope.cancel = function() {
        $scope.selected = -1
        $scope.flag = false
        $scope.updateInputs = true
        $scope.fakeButton = false
    }

    $scope.fakeUpdate = function() {
        $scope.updateInputs = false
        $scope.fakeButton = true
    }

    $scope.showAddSection = function(name, message, image, id, status, linkcampaign) {
        $scope.campaign = {
            name: name,
            message: message,
            image: image,
            id: id,
            status: status,
            linkcampaign: linkcampaign
        }
        if (name) {
            $scope.isAnEdit = true;
        }
        $scope.overlayShowing = true
    }
    $scope.hideAddSection = function() {
        $scope.overlayShowing = false
        $scope.isAnEdit = false;
    }
    $scope.submit = function(campaign) {
        if ($scope.isAnEdit) {
            $scope.updateCampaign($scope.campaign)
            $scope.isAnEdit = false
        } else {
            $scope.isAnEdit = false
            $scope.overlayShowing = false
            $scope.updateInputs = true
            $scope.fakeButton = false
            $scope.selected = -1;
            $scope.flag = false;
            $scope.addCampaignSection = false
            campaign.userid = userService.user.id
            campaignsService.addCampaign(campaign).then(function(response) {
                if (response.status === 200) {
                    campaignsService.updateCampaignStatus(response.data[0].id).then(function(resp) {
                        campaignsService.getCampaigns(userService.user.id).then(function(res) {
                            $scope.campaigns = res.data.reverse()
                        })
                    })
                }
            })
        }
    }
    var getCampaigns = function() {
        campaignsService.getCampaigns(userService.user.id).then(function(res) {
            var campaigns = res.data.reverse()
            $scope.campaigns = campaigns.sort(function(a, b) {
                return a.status > b.status;
            })

        })
    }
    getCampaigns()

    $scope.deleteCampaign = function(campaign) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this information!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        }).then(function(res) {
            if (res.value) {
                swal("Deleted!", "Successfully deleted.", "success");

                $scope.updateInputs = true
                $scope.fakeButton = false
                $scope.selected = -1;
                $scope.flag = false;
                campaignsService.deleteCampaign(campaign.id).then(function(res) {
                    if (res.status === 200) {
                        getCampaigns()
                    }
                })
            }

        }).catch(function() {})

    }
    $scope.flag = false
    $scope.showUpdate = function(campaign, i) {
        $scope.updateInputs = true
        $scope.fakeButton = false
        if (!$scope.flag) {
            $scope.selected = i;
            $scope.name = campaign.name;
            $scope.image = campaign.image;
            $scope.message = campaign.message;
            $scope.status = campaign.status;
            $scope.flag = true;
        } else {
            $scope.selected = -1;
            $scope.flag = false;
        }

    }

    $scope.selected = -1

    $scope.updateCampaign = function(campaign) {
        $scope.updateInputs = true
        $scope.fakeButton = false
        $scope.selected = -1
        $scope.flag = false
        campaignsService.updateCampaign(campaign).then(function(res) {
            if (res.status === 200) {
                getCampaigns()
                $scope.overlayShowing = false
            }
        })
    }

    $scope.updateCampaignStatus = function(campaign) {
        $scope.updateInputs = true
        $scope.fakeButton = false
        $scope.selected = -1
        $scope.flag = false
        campaignsService.updateCampaignStatus(campaign.id).then(function(res) {
            if (res.status === 200) {
                getCampaigns()
            }
        })

    }
    $('#photoInput').on('change', function() {
        $scope.showCampaignImg = false
        $scope.showLoader = true
        let file = $('#photoInput')[0].files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            let ext = file.name.split('.')
            campaignsService.uploadPhoto({
                imageName: file.name,
                imageBody: reader.result,
                imageExtension: ext[ext.length - 1]
            }).then(function(r) {
                $scope.showCampaignImg = true
                $scope.showLoader = false
                $scope.campaign.image = r.data;
            }).catch(function(e){
                $scope.showCampaignImg = true
                $scope.showLoader = false
            })
        }
        // if already a photo change to change cover photo
        if (file) {
            reader.readAsDataURL(file);
            // document.getElementById('coverPhoto').innerHTML = 'Change Cover Photo'
        } else {
        }
    });

})
