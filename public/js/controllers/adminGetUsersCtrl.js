angular.module('spotme').controller('adminGetUsersCtrl', function($scope, $state, linksService, messageService, userService, locationsService, campaignsService, adminService){
    adminService.getAllUsers().then(function(res){
        $scope.users = res.data;
        $scope.originalUsers = res.data;
    })
    $scope.orderList = () => {
        var users = $scope.users.slice();
        users.sort(function(a, b) {
            return a[$scope.orderBy] > b[$scope.orderBy]
        })
        $scope.users = users;
    }
    $scope.searchList = function() {
        var users = $scope.users.slice();
        var r = new RegExp($scope.searchItem, 'gi');
        var newUsers = users.filter(function(v) {
            var searchStr = `${v.id} ${v.businessname} ${v.firstname} ${v.lastname} ${v.phonenumber} ${v.email} ${v.paid}`;
            if (r.test(searchStr)) {
                return v
            }
        })
        $scope.users = newUsers;
    }
    $scope.handleSearchInput = function(e) {
        if(e.keyCode === 8 && !$scope.searchItem) {
            $scope.users = $scope.originalUsers;
        } else {
            $scope.searchList()
        }
    }
})
