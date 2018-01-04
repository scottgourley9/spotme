angular.module('spotme').controller('adminEditUserCtrl', function($scope, $state, linksService, messageService, userService, locationsService, campaignsService, adminService){
    $scope.showTopEdit = true;
    $scope.showEditInputs = false;
    $scope.submitEditId = function(id){
        $scope.showTopEdit = false;
        $scope.showEditInputs = true;
        adminService.getUserById(id).then(function(res){
            $scope.user = res.data;
        })
    }
    $scope.submitChanges = function() {
        adminService.updateUser($scope.user).then(function(res){
            if (res.status === 200) {
                $scope.showTopEdit = true;
                $scope.showEditInputs = false;
                $scope.user = {};
                swal("Success", "User successfully updated", "success");
            } else {
                swal("Error", "Something went wrong", "error");
            }
        })
    }
})
