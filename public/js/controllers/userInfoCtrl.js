angular.module('spotme').controller('userInfoCtrl', function($scope, $auth, $state, messageService, userService){
  var getUser = function(){
    userService.getUser(userService.user.id).then(function(res){
      userService.user = res.data[0]
      $scope.userInfo = userService.user
      $scope.businessname = userService.user.businessname
      $scope.firstname = userService.user.firstname
      $scope.lastname = userService.user.lastname
      $scope.phonenumber = userService.user.phonenumber
      $scope.email = userService.user.email
      $scope.password = userService.user.password
    })
  }
  getUser()


  $scope.original = true;
  $scope.showInput = false;
  $scope.showEdit = function(){
    $scope.original = !$scope.original;
    $scope.showInput = !$scope.showInput;
  }
  $scope.update = function(){

    var newData = {
      businessname: document.getElementById('businessname').value,
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      phonenumber: document.getElementById('phonenumber').value,
      email: document.getElementById('email').value,
    }
    swal({
  title: "Are you sure?",
  text: "This will permanently change your information.",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, submit changes",
  cancelButtonText: "No, cancel changes",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {

    swal("Submited", "Changes saved, you will now be logged out for changes to take effect", "success");

      userService.updateUser(newData).then(function(res){
        if(res.status === 200){
          $auth.logout()
          $state.go('welcome')
      }
      })
  } else {

    swal("Cancelled", "No changes made", "error");
  }
});




  }
})
