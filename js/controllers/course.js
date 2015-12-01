'use strict';

angular.module('dlnMovingOnUpApp')
.controller('courseCtrl', function($scope, $stateParams) {

  $scope.subject = $stateParams.subject;
  $scope.module = $stateParams.module;
  $scope.lesson = $stateParams.lesson;
  
});
