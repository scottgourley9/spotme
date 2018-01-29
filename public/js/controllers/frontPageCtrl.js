angular.module('spotme').controller('frontPageCtrl', function($document, $scope, $state){

$('#hamMenu').css('display', 'flex');

$scope.hamMenuShowing = false;
$scope.slideMenu = [];

  $scope.hamClick = function(){
    $scope.slideMenu.splice(0)

    if(!$scope.hamMenuShowing){
      $scope.slideMenu.push('animated slideInDown')
      $scope.hamMenuShowing = !$scope.hamMenuShowing
    }
    else {
      $scope.slideMenu.push('animated slideOutUp')
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
