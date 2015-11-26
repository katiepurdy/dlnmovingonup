'user strict';

var app = angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
      .state('root', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'templates/header.html'
          },
          'main': {
            templateUrl: 'templates/home.html'
          },
          'footer':{
            templateUrl: 'templates/footer.html'
          }
        }
      })
      .state('root.contact', {
        url: 'contact',
        views: {
          'main@': {
            templateUrl: 'templates/contact.html'
          }
        }
      })
      .state('root.resources', {
        url: 'resources',
        views: {
          'main@': {
            templateUrl: 'templates/resources.html'
          }
        }
      }); 
    }
  ]);

