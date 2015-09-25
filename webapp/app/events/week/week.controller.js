(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('WeekController', WeekController);

    WeekController.$inject = ['$stateParams', 'Events'];

    function WeekController($stateParams, Events) {
        var vm = this;

        function loadEvents(cities, startDate, endDate) {
            var dateRange = (endDate-startDate)/(1000*60*60*24);
            Events.getDateList(cities, startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), dateRange)
                .success(function(response) {
                    vm.dates = response;
                })
                .error(function() {
                });
        }

        vm.updateEvents = function(city, startDate, endDate) {
            loadEvents(city, startDate, endDate);
        };

        function init() {
            if ($stateParams.cities) {
                vm.cities = $stateParams.cities
            } else {
                vm.cities = 'all';
            }
            var startDate = new Date();
            var weekday = startDate.getDay(); // 0 = sunday, 1 = monday...
            /*
             * 0 = sunday, 1 = monday...
             * -- > 0 = monday, 1 = tuesday
             */
            if (weekday === 0) {
                weekday = 6;
            } else {
                weekday = weekday - 1
            }
            vm.startDate = new Date(new Date().setDate(startDate.getDate()-weekday));
            vm.endDate = new Date(new Date().setDate(vm.startDate.getDate()+7));
            loadEvents(vm.cities, vm.startDate, vm.endDate);
        }
        init();
    }
})();