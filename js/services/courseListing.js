'use strict';

angular.module('dlnMovingOnUpApp')
.service('courseListingService', function($http) {
  this.getCourseListing = function(callback) {
    $http.get('courseListing.json').then(callback);
  };
});