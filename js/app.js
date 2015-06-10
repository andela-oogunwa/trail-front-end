/* global angular*/
'use strict';

angular.module('TrailApp', ['ngMaterial']);

angular.module('TrailApp').controller('MainCtrl',['$scope','$timeout','$mdSidenav', '$mdUtil','$filter', function($scope, $timeout, $mdSidenav, $mdUtil, $filter){
  $scope.filterArray = [];
  $scope.toggleLeft = buildToggler('left');
  $scope.filterLabelsArray = [];

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

  $scope.filterMember = function(member, selected) {

    if(selected){
      $scope.filterArray.push(member);
    } else {
      $scope.filterArray.splice($scope.filterArray.indexOf(member),1);
    }
  };

  $scope.filterLabel = function(label, selected) {
    if(selected){
      $scope.filterLabelsArray.push(label);
    } else {
      $scope.filterLabelsArray.splice($scope.filterLabelsArray.indexOf(label),1);
    }
  };


  $scope.cards = [{
    title: 'Convene and engage community',
    status: 'SUCCESS',
    member: ['Abimbola Idowu','Fadekemi Ogunwa'],
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications'],
    labels:['Success', 'Ops']
  }, {
    title: 'book speaking roles to drive income leads',
    status: 'SUCCESS',
    member: ['Abimbola Idowu', 'Nadayar Enegesi'],
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications'],
    labels:['marketing and comms', 'Ops']
  }, {
    title: 'book speaking roles to drive income leads',
    status: 'SUCCESS',
    member: ['Nad Brice'],
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications'],
    labels:['Seeking help','failed','professional development']
  }, {
    title: 'Train young software developers',
    status: 'SUCCESS',
    member: ['Fadekemi Ogunwa', 'Abimbola Idowu'],
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications'],
    labels:['failed']
  }, {
    title: 'book speaking roles to drive income leads',
    status: 'SUCCESS',
    member: ['Obie Fernandez', 'Christina Sass'],
    tasks: ['Double the number of major events produced from previous year', 'Craft a 3-minute stump speech', 'Craft a 5-minutes stump speech', 'Double high level engagment iwth twice-monthly email communications'],
    labels:['Success','failed','Seeking help','professional development']
  }];
  $scope.allMembers = [];
  $scope.allCardMembers = [];
  $scope.allLabels = [];
  $scope.allCardLabels = [];

  _.forEach($scope.cards,function(card) {
    $scope.allMembers.push(card.member);
  });

  if($scope.allMembers) {
    $scope.allCardMembers = _.uniq($scope.allCardMembers.concat.apply($scope.allCardMembers, $scope.allMembers));
  };

  console.log('allCardMembers', $scope.allCardMembers);


  _.forEach($scope.cards, function(card){
    $scope.allLabels.push(card.labels);
  });

  if($scope.allLabels) {
    $scope.allCardLabels = _.uniq($scope.allCardLabels.concat.apply($scope.allCardLabels, $scope.allLabels));
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

angular.module('TrailApp').filter('cardFilter', function () {
  return function (allCards, searchArray) {
    console.log('called with',searchArray);
    if (!angular.isUndefined(allCards) && !angular.isUndefined(searchArray) && searchArray.length > 0) {
      var searchResult = [];
      _.forEach(allCards, function (card) {
        console.log('intersection',_.intersection(card.member,searchArray));
        console.log('intersection',_.intersection(card.labels,searchArray));
        if(_.intersection(card.member,searchArray).length > 0 || _.intersection(card.labels,searchArray).length > 0) {
          searchResult.push(card);
        }
      });
       return searchResult;
    } else {
       return allCards;
    }
   };

});






