'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('homeview', {
        url: '/',
        templateUrl: 'static/events/week/week.html',
        controller: 'WeekController',
        controllerAs: 'week'
      })
      .state('events', {
        url: '/events?city&year&month&day&range',
        templateUrl: 'static/events/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events'
      });
}]);
