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
  }];
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.showDropdown = {
    sectionOne : false,
    sectionTwo : false,
    sectionThree : false,
    sectionFour : false
  };

  $scope.togglesection = function(sectionName) {
    console.log('index');

    $scope.showDropdown[sectionName] = !$scope.showDropdown[sectionName];
  };
  $scope.checkDropdown = function(sectionName) {
    console.log('show dropdown',sectionName);
    return $scope.showDropdown[sectionName];
  };

}]);
