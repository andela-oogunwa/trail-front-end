/* global angular*/
'use strict';

angular.module('TrailApp', ['ngMaterial']);

angular.module('TrailApp').controller('MainCtrl',['$scope','$timeout','$mdSidenav', '$mdUtil','$filter', 'TrelloSrv', function($scope, $timeout, $mdSidenav, $mdUtil, $filter, TrelloSrv){
  $scope.filterArray = [];
  $scope.allCardMembers = [];
  $scope.allCardLabels = [];
  $scope.toggleLeft = buildToggler('left');
  $scope.filterLabelsArray = [];
  $scope.cards = [];

  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle();
        },300);
    return debounceFn;
  }
  $scope.close = function() {
    $mdSidenav('left').close();
  };

  $scope.filterMember = function(id, selected) {
    if(selected){
      $scope.filterArray.push(id);
    } else {
      $scope.filterArray.splice($scope.filterArray.indexOf(id),1);
    }
  };

  $scope.filterLabel = function(label, selected) {
    if(selected){
      $scope.filterArray.push(label);
    } else {
      $scope.filterArray.splice($scope.filterArray.indexOf(label),1);
    }
  };


  $scope.toggleCards = function(index) {
    $scope.cards[index].isOpen = !$scope.cards[index].isOpen;
    angular.forEach($scope.cards, function(value, key) {
      if (key !== index) {
        value.isOpen = false;
      }
    });
  };
  TrelloSrv.authorize();
  TrelloSrv.load().then(function(data) {
    TrelloSrv.processMembers(data).then(function(members) {
      $scope.allCardMembers = members;
    });
    TrelloSrv.processLabels(data).then(function(labels) {
      $scope.allCardLabels = labels;
    });
    TrelloSrv.processCards(data).then(function(cards) {
      $scope.cards = cards;
    });
  }, function(error) {
    console.log(error);
  });
}]);

angular.module('TrailApp').filter('cardFilter', function () {
  return function (allCards, searchArray) {
    if (!angular.isUndefined(allCards) && !angular.isUndefined(searchArray) && searchArray.length > 0) {
      var searchResult = [];
      _.forEach(allCards, function (card) {
        if(_.intersection(card.membersid,searchArray).length > 0 || _.intersection(card.labels,searchArray).length > 0) {
          searchResult.push(card);
        }
      });
       return searchResult;
    } else {
       return allCards;
    }
   };

});
