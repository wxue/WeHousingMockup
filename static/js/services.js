/* Services */

angular.module('apt.services', [])
  .factory('AptItem', function($resource) {
    return $resource('/static/js/apt_dummy.json');
  })
;