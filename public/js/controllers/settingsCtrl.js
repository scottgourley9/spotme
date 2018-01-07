angular.module('spotme').controller('settingsCtrl', function($scope, $state, messageService, userService){

  $scope.changePassword = function(){
    swal({
  title: "Enter current password",
  input: "password",
  showCancelButton: true,
  animation: "slide-from-top",
  inputPlaceholder: "Password"
}).then(function(inputValue){
    if (inputValue.value) {

        if (inputValue.value === "") {
          swal.showInputError("Type your current password");
          return false
        }
        userService.checkPass(inputValue.value).then(function(res){
          if(res.data){


        swal({
        title: "Enter NEW password",
        input: "password",
        showCancelButton: true,
        animation: "slide-from-top",
        inputPlaceholder: "New Password"
      }).then(function(inputValue2){
          if (inputValue2.value) {
              if (inputValue2.value === "") {
                swal.showInputError("Write your NEW password");
                return false
              }
              userService.changePassword(inputValue2.value).then(function(resp){
                if(resp.status === 200){
                  swal("Success", "Your password has been changed!", "success");
                }
                else {
                  swal("Sorry", "There was an error", "error");
                }
              })
          }


      }).catch(function(){})
      }
      else {
        swal("Error", "Incorrect password", "error");
      }
      })
    }

}).catch(function(){})

  }


})
