angular.module('spotme', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('dashboard', {
    templateUrl: '../views/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .state('yesOrNo', {
    templateUrl: '../views/yesOrNo.html',
    controller: 'yesOrNoCtrl'
  })
})
