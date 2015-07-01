'use strict';

angular.module('TrailApp').directive('trailDropdown', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.expanded = false;
      var icon = element.find('i');
      var _container = element.find('div.trail-list div');
      var container = element.find('div.trail-list');
      element.find('.md-title').bind('click', function() {
        if(!attrs.height) {
          attrs.height = _container.prop('clientHeight') + 10; //adding 10px because of the margin and padding of a div, this should be improved
        }
        if (!attrs.expanded) {
          icon.removeClass('md-icon-toggle').addClass('md-icon-toggled');
          container.css('height', attrs.height);
          container.removeClass('menu-toggle-list').addClass('menu-toggled-list');
        } else {
          icon.removeClass('md-icon-toggled').addClass('md-icon-toggle');
          container.css('height', 0);
          container.removeClass('menu-toggled-list').addClass('menu-toggle-list');
        }
        attrs.expanded = !attrs.expanded;
      });
    }
  };
}]);
