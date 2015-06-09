/* global angular*/
'use strict';

angular.module('TrailApp', ['ngMaterial']);

angular.module('TrailApp').controller('MainCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.cards = [{
    title: 'Convene and engage community',
    status: 'SUCCESS',
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications']
  }, {
    title: 'book speaking roles to drive income leads',
    status: 'SUCCESS',
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications']
  }, {
    title: 'book speaking roles to drive income leads',
    status: 'SUCCESS',
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications']
  }, {
    title: 'book speaking roles to drive income leads',
    status: 'SUCCESS',
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications']
  }, {
    title: 'book speaking roles to drive income leads',
    status: 'SUCCESS',
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications']
  }];

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.toggleCards = function(index) {
    $scope.cards[index].isOpen = !$scope.cards[index].isOpen;
    angular.forEach($scope.cards, function(value, key) {
      if (key !== index) {
        value.isOpen = false;
      }
    });
  };
}]);
