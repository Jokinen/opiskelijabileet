'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'datePicker'
]).
config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('homeview', {
        url: '/',
        templateUrl: 'static/events/day-range/day-range.html',
        controller: 'DayRangeController',
        controllerAs: 'dr'
      })
      .state('events', {
        url: '/events?city&year&month&day&range',
        templateUrl: 'static/events/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events'
      });
}]);
