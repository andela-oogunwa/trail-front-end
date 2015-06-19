/* global angular*/
'use strict';

angular.module('TrailApp', ['ngMaterial']);
angular.module('TrailApp').run(function(TrelloSrv) {
  TrelloSrv.authorize();
});
angular.module('TrailApp').controller('MainCtrl',['$scope','$timeout','$mdSidenav', '$mdUtil','$filter', 'TrelloSrv', '$mdDialog', '$interpolate', function($scope, $timeout, $mdSidenav, $mdUtil, $filter, TrelloSrv, $mdDialog, $interpolate){
  $scope.filterArray = [];
  $scope.allCardMembers = [];
  $scope.allCardLabels = [];
  $scope.toggleLeft = buildToggler('left');
  $scope.filterLabelsArray = [];
  $scope.cards = [];
  $scope.initials = {};
  $scope.avatarHash = {};
  $scope.interpolate = function (value) {
    console.log(value);
    return $interpolate(value)($scope);
  };
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


  $scope.toggleCards = function(id) {
    if(id === $scope.openCard) {
      $scope.openCard = 'all close';
      return;
    }
    $scope.openCard = id;
  };

  $scope.showCardDetails = function(env, card) {
    $mdDialog.show({

      controller: function DialogController($scope, $mdDialog) {
        $scope.mode = 'determinate';
        $scope.card  = card;

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      },
      templateUrl: 'partials/cardDetails.tmpl.html',
      // parent: angular.element(document.body),
      targetEvent: env
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };


  TrelloSrv.load().then(function(data) {
    TrelloSrv.processMembers(data).then(function(result) {
      $scope.initials = result.initials;
      console.log(result.avatarHash);
      $scope.avatarHash = result.avatarHash;
      $scope.allCardMembers = result.members;
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


