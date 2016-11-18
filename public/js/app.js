angular.module('spotme', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('welcome', {
    url: '/',
    templateUrl: '../views/welcome.html',
    controller: 'welcomeCtrl'
  })
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
  .state('noForm', {
    url: '/noForm',
    templateUrl: '../views/noForm.html',
    controller: 'noFormCtrl'
  })
})
