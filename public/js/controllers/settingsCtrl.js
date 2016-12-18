angular.module('spotme').controller('settingsCtrl', function($scope, $state, messageService, userService){

  $scope.changePassword = function(){
    swal({
  title: "Enter current password",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  inputPlaceholder: "Password"
},
function(inputValue){
  if (inputValue === false) return false;

  if (inputValue === "") {
    swal.showInputError("Write your current password");
    return false
  }
  userService.checkPass(inputValue).then(function(res){
    if(res.data){


  swal({
  title: "Enter NEW password",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  inputPlaceholder: "New Password"
},
function(inputValue2){
  if (inputValue2 === false) return false;

  if (inputValue2 === "") {
    swal.showInputError("Write your NEW password");
    return false
  }
  userService.changePassword(inputValue2).then(function(resp){
    if(resp.status === 200){
      swal("Success", "Your password has been changed!", "success");
    }
    else {
      swal("Sorry", "There was an error", "error");
    }
  })

});
}
else {
  swal("Error", "Incorrect password", "error");
}
})
});

  }


})
