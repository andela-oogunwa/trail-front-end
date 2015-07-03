'use strict';

angular.module('TrailApp').filter('cardFilter', function () {
  var _searchResult;
  return function (allCards, searchArray) {
    if (!angular.isUndefined(allCards) && !angular.isUndefined(searchArray) && searchArray.length > 0) {
      var searchResult = [];
      _.forEach(allCards, function (card) {
        _.forEach(searchArray, function(value) {
          if(_.find(card.labels, 'name', value) || card.membersid.indexOf(value) !== -1) {
            searchResult.push(card);
          }
        });
        _searchResult = _.uniq(searchResult, function(card) {
          return card.id;
        });
      });
       return _searchResult;
    } else {
       return allCards;
    }
   };
});

angular.module('TrailApp').filter('strLimit', ['$filter',
  function($filter) {
    return function(input, limit) {
      if (input) {
        if (input.length <= limit) {
          return input;
        }
        return $filter('limitTo')(input, limit) + '...';
      }
    };
  }
]);
