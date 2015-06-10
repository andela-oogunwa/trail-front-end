'use strict';

angular.module('TrailApp').factory('TrelloSrv', ['$q', '$http', function($q, $http) {
  return {
    authorize: function() {
      var opts = {
        type: "popup",
        name: "Andela Trail",
        persist: true,
        expiration: "never",
        success: function() {
          console.log('Authorized Trello');
        },
        error: function() {
          console.log('Error Occured', arguments);
        }
      };
      Trello.authorize(opts);
    },
    load: function() {
      return $q(function(resolve, reject) {
        var opts = {
          cards: 'visible',
          card_checklists: 'all',
          card_fields: 'all',
          checklist_fields: 'all',
          fields: 'all',
          labels: 'all',
          member_fields: 'all',
          memberships: 'all',
          memberships_member: true,
          memberships_member_fields: 'all'
        };
        Trello.boards.get('I7Xkqbkn', opts, resolve, reject);
      });
    }
  };
}]);
