(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('DayRangeController', DayRangeController);

    DayRangeController.$inject = ['$stateParams', 'Events'];

    function DayRangeController($stateParams, Events) {
        var vm = this;

        function loadEvents(cities, startDate, endDate) {
            var dateRange = Math.round((endDate-startDate)/(1000*60*60*24));
            Events.getDateList(cities, startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), dateRange+1)
                .success(function(response) {
                    vm.dates = response;
                })
                .error(function() {
                });
        }

        vm.updateEvents = function(city, startDate, endDate) {
            loadEvents(city, startDate, endDate);
        };

        vm.openEvent = function(day, event) {
            var dayIndex = vm.dates.indexOf(day);
            var eventIndex = vm.dates[dayIndex].events.indexOf(event);
            if (!vm.selectedEvent.active) {
                vm.dates[dayIndex].events[eventIndex].selected = true;
                vm.selectedEvent = {
                    active: true,
                    day: day,
                    event: event
                };
            }
        };

        vm.closeEvent = function() {
            var dayIndex = vm.dates.indexOf(vm.selectedEvent.day);
            var eventIndex = vm.dates[dayIndex].events.indexOf(vm.selectedEvent.event);
            vm.dates[dayIndex].events[eventIndex].selected = false;
            vm.selectedEvent.active = false;
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
            vm.endDate = new Date(new Date().setDate(vm.startDate.getDate()+6));
            vm.selectedEvent = {
                active:false,
                event: {}
            };
            vm.visibleFilter = '';
            loadEvents(vm.cities, vm.startDate, vm.endDate);
        }
        init();
    }
})();