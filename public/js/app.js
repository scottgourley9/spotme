angular.module('spotme', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '../views/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .state('yesOrNo', {
    url: '/yesOrNo',
    templateUrl: '../views/yesOrNo.html',
    controller: 'yesOrNoCtrl'
  })
})
