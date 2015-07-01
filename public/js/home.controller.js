'use strict';

angular.module('TrailApp').controller('HomeCtrl', ['$scope','$mdSidenav', '$mdUtil', 'TrelloSrv', '$mdDialog', function($scope, $mdSidenav, $mdUtil, TrelloSrv, $mdDialog){
  TrelloSrv.authorize();
  $scope.filterArray = [];
  $scope.allCardMembers = [];
  $scope.allCardLabels = [];
  $scope.toggleLeft = buildToggler('left');
  $scope.filterLabelsArray = [];
  $scope.cards = [];
  $scope.isLoading = true;
  $scope.initials = {};
  $scope.avatarHash = {};
  $scope.mode = 'determinate';
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

  $scope.getImage = function(imageLink,card) {
    card.imageLink = imageLink || '../default.png';
    return card.imageLink;
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

  $scope.showCardDetails = function(env, card, fullNames) {
    $mdDialog.show({

      controller: function DialogController($scope, $mdDialog) {
        $scope.mode = 'determinate';
        $scope.card  = card;
        $scope.fullNames = fullNames;

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
      $scope.avatarHash = result.avatarHash;
      $scope.membersNames = result.fullNames;
      $scope.allCardMembers = result.members;
      $scope.isLoading = false;
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
