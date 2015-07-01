'use strict';

angular.module('TrailApp').controller('LoginCtrl', ['$scope', 'TrelloSrv', '$state', 'toaster', function($scope, TrelloSrv, $state, toaster) {
  $scope.errorMessage = "You are not authorize to view this board.";
  $scope.login = function() {
    TrelloSrv.authorize().then(function() {
      $state.go('home');
    }, function() {
      toaster.error("You are not authorize to view the Andela OKR board.", "");
    });
  };
}]);
