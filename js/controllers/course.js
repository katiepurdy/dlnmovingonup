angular.module('dlnMovingOnUpApp')
.controller('courseCtrl', function($rootScope, $scope, $stateParams) {

  $scope.subject = $stateParams.subject;
  $scope.module = $stateParams.module;
  $scope.lesson = $stateParams.lesson;

  $rootScope.pagetitle = $scope.lesson;
  
});