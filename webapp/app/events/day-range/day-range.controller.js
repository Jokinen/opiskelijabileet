(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('DayRangeController', DayRangeController);

    DayRangeController.$inject = ['$stateParams', 'Events', '$state'];

    function DayRangeController($stateParams, Events, $state) {
        var vm = this;

        function loadEvents(cities, startDate, endDate, callback) {
            var dateRange = Math.round((endDate-startDate)/(1000*60*60*24));
            Events.getDateList(cities, startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), dateRange+1)
                .success(function(response) {
                    vm.dates = response;
                    if(callback) callback();
                })
                .error(function() {
                });
        }

        function getWeekForDay(day, dayObj, targetEvent) {
            var weekday = day.getDay(); // 0 = sunday, 1 = monday...
            /*
             * 0 = sunday, 1 = monday...
             * -- > 0 = monday, 1 = tuesday
             */
            if (weekday === 0) {
                weekday = 6;
            } else {
                weekday = weekday - 1
            }
            vm.startDate = new Date(new Date().setTime(day.getTime()-(weekday*1000*60*60*24)));
            vm.endDate = new Date(new Date().setTime(vm.startDate.getTime()+(6*1000*60*60*24)));
            loadEvents(vm.cities, vm.startDate, vm.endDate, function(){
                if (dayObj && targetEvent) {
                    vm.openEvent(dayObj, targetEvent);
                }
            });
        }

        vm.updateEvents = function(city, startDate, endDate) {
            loadEvents(city, startDate, endDate);
        };

        function arrayObjectIndexOf(arr, obj){
            for(var i = 0; i < arr.length; i++){
                if(angular.equals(arr[i], obj)){
                    return i;
                }
            }
            return -1;
        }

        vm.openEvent = function(day, event) {
            var dayIndex = arrayObjectIndexOf(vm.dates, day);
            var eventIndex = arrayObjectIndexOf(vm.dates[dayIndex].events, event);
            if (!vm.selectedEvent.active) {
                vm.dates[dayIndex].events[eventIndex].selected = true;
                vm.selectedEvent = {
                    active: true,
                    day: vm.dates[dayIndex],
                    event: vm.dates[dayIndex].events[eventIndex]
                };
                if ($state.current.name !== 'event') {
                    $state.go('event', {eventId: vm.selectedEvent.event.id}, {
                        notify: false,
                        reload: false
                    });
                }
            }
        };

        vm.closeEvent = function() {
            var dayIndex = vm.dates.indexOf(vm.selectedEvent.day);
            var eventIndex = vm.dates[dayIndex].events.indexOf(vm.selectedEvent.event);
            vm.dates[dayIndex].events[eventIndex].selected = false;
            vm.selectedEvent.active = false;
            $state.go('events', {}, {notify: false});
        };

        function init() {
            if ($stateParams.cities) {
                vm.cities = $stateParams.cities
            } else {
                vm.cities = 'all';
            }
            vm.selectedEvent = {
                active: false
            };
            if ($stateParams.eventId) {
                Events.get($stateParams.eventId)
                    .success(function(event){
                        var date = new Date(event.start_time);
                        Events.getDay(date.getFullYear(), date.getMonth()+1, date.getDate())
                            .success(function(dayObj) {
                                getWeekForDay(new Date(event.start_time), dayObj, event)
                            });
                    })
                    .error(function(error){
                    });
            } else {
                getWeekForDay(new Date())
            }
            vm.visibleFilter = '';
        }
        init();
    }
})();