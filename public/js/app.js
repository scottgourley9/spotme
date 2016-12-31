angular.module('spotme', ['ui.router', 'satellizer', 'googlechart', 'chart.js', 'angularPayments']).config(function($locationProvider, $stateProvider, $urlRouterProvider){

window.Stripe.setPublishableKey('pk_test_Tn3IiCqUvP8odDyXFcsutg1d')
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('welcome', {
    url: '/',
    templateUrl: '../views/welcome.html',
    controller: 'welcomeCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: '../views/signup.html',
    controller: 'signupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: '../views/login.html',
    controller: 'loginCtrl'
  })
  .state('yesOrNo', {
    url: '/yesOrNo/:id/:linkId/:customerId/:messageId',
    templateUrl: '../views/yesOrNo.html',
    controller: 'yesOrNoCtrl'
  })
  .state('noForm', {
    url: '/noForm',
    templateUrl: '../views/noForm.html',
    controller: 'noFormCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '../views/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .state('dashboard.theDashboard', {
    url: '/theDashboard',
    templateUrl: '../views/theDashboard.html',
    controller: 'theDashboardCtrl'
  })
  .state('dashboard.sendLink', {
    url: '/sendlink',
    templateUrl: '../views/sendLink.html',
    controller: 'sendLinkCtrl'
  })
  .state('dashboard.campaigns', {
    url: '/campaigns',
    templateUrl: '../views/campaigns.html',
    controller: 'campaignsCtrl'
  })
  .state('dashboard.customers', {
    url: '/customers',
    templateUrl: '../views/customers.html',
    controller: 'customersCtrl'
  })
  .state('dashboard.locations', {
    url: '/locations',
    templateUrl: '../views/locations.html',
    controller: 'locationsCtrl'
  })
  .state('dashboard.reviews', {
    url: '/reviews',
    templateUrl: '../views/reviews.html',
    controller: 'reviewsCtrl'
  })
  .state('dashboard.settings', {
    url: '/settings',
    templateUrl: '../views/settings.html',
    controller: 'settingsCtrl'
  })
  .state('dashboard.userInfo', {
    url: '/userInfo',
    templateUrl: '../views/userInfo.html',
    controller: 'userInfoCtrl'
  })
  .state('dashboard.updateLinks', {
    url: '/updateLinks/:address/:id',
    templateUrl: '../views/updateLinks.html',
    controller: 'updateLinksCtrl'
  })
  .state('dashboard.payment', {
    url: '/payment',
    templateUrl: '../views/payment.html',
    controller: 'paymentCtrl'
  })
  // $locationProvider.html5Mode(true);

})
