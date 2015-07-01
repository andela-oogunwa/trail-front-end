/* global angular*/
'use strict';

angular.module('TrailApp', ['ngAnimate', 'ngMaterial', 'ui.router', 'toaster'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '../partials/login.tmpl.html'
    })
    .state('home', {
      url: '/',
      templateUrl: '../partials/home.tmpl.html'
    });
}]);

angular.module('TrailApp').run(['$rootScope', '$location', 'TrelloSrv',
  function($rootScope, $location, TrelloSrv) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!TrelloSrv.isAuthorized() && toState.name !== 'login') {
        console.log('not isAuthorized');
        $location.path('/login');
      } else if (TrelloSrv.isAuthorized() && toState.name === 'login') {
        $location.path('/');
      }
    });
  }]);
