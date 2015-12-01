'use strict';

angular.module('dlnMovingOnUpApp')
.controller('navigationCtrl', function($scope, courseListingService) {
  courseListingService.getCourseListing(function(response) {
    $scope.subjects = response.data;
  });
});
