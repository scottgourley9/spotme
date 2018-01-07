angular.module('spotme').controller('reviewsCtrl', function($scope, $state, messageService, reviewsService){
  var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 14
  });

  var request = {
  placeId: 'ChIJo5IOsmKIUocRS15MTIPv464' // example: ChIJN1t_tDeuEmsRUsoyG83frY4
  };


  var service = new google.maps.places.PlacesService(map); // map is your map object
  service.getDetails(request, function(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    $scope.test = place.reviews
    console.log($scope.test);
  }
  })
  setTimeout(function(){
    $scope.reviews = $scope.test
    console.log($scope.reviews);
  },1000)
})
