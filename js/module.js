'use strict';

var dlnMovingOnUpApp = angular.module('dlnMovingOnUpApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
      .state('root', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'templates/header.html',
            controller: 'navigationCtrl'
          },
          'main': {
            templateUrl: 'templates/home.html'
          },
          'footer':{
            templateUrl: 'templates/footer.html'
          }
        }
      })
      .state('root.course', {
        url: 'courses/:subject/:module/:lesson',
        views: {
          'main@': {
            templateUrl: 'templates/course.html',
            controller: 'courseCtrl'
          }
        }
      })
      .state('root.story', {
        url: 'courses/:subject/:module/:lesson/launch',
        views: {
          'main@': {
            templateUrl: function (stateParams) {
              return '/mockcourses/' + stateParams.subject + '/' +
              stateParams.module + '/' + stateParams.lesson + '/story.html';
            },
            controller: 'storyCtrl'
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
      })
      .state('root.centres', {
        url: 'centres',
        views: {
          'main@': {
            templateUrl: 'templates/centres.html'
          }
        }
      })
      .state('root.copyright', {
        url: 'copyright-information',
        views: {
          'main@': {
            templateUrl: 'templates/copyright.html'
          }
        }
      }); 
    }
  ]);