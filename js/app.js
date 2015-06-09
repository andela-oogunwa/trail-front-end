/* global angular*/
'use strict';

angular.module('TrailApp', ['ngMaterial']);

angular.module('TrailApp').controller('MainCtrl',['$scope','$timeout','$mdSidenav', '$mdUtil', '$log', function($scope, $timeout, $mdSidenav, $mdUtil, $log){
  $scope.toggleLeft = buildToggler('left');
  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        },300);
    return debounceFn;
  }
  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
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

  $scope.toggleCards = function(index) {
    $scope.cards[index].isOpen = !$scope.cards[index].isOpen;
    angular.forEach($scope.cards, function(value, key) {
      if (key !== index) {
        value.isOpen = false;
      }
    });
  };
}]);
