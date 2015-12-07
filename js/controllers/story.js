angular.module('dlnMovingOnUpApp')
.controller('storyCtrl', function($rootScope, $scope, $location, $stateParams) {

  $scope.subject = $stateParams.subject;
  $scope.module = $stateParams.module;
  $scope.lesson = $stateParams.lesson;

  $scope.loc = $location.url();


  
});