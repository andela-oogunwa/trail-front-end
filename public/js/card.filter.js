'use strict';

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
