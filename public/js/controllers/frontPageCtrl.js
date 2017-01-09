angular.module('spotme').controller('frontPageCtrl', function($document, $scope, $state){
//   $(document).ready(function () {
//   function reorient(e) {
//     var portrait = (window.orientation % 180 == 0);
//     $("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
//   }
//   window.onorientationchange = reorient;
//   window.setTimeout(reorient, 0);
// });
$scope.hamMenuShowing = false;
$scope.slideMenu = []
  $scope.hamClick = function(){
    $scope.slideMenu.splice(0)

    if(!$scope.hamMenuShowing){
      $scope.slideMenu.push('animated bounceInDown')
      $scope.hamMenuShowing = !$scope.hamMenuShowing
    }
    else {
      $scope.slideMenu.push('animated bounceOutUp')
      setTimeout(function(){
        $scope.hamMenuShowing = !$scope.hamMenuShowing
      }, 500)

      // $scope.slideMenu.splice(0)
    }

  }
  $scope.about = function(){
    $state.go('welcome')
  }
})
