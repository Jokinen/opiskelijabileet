(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ControlRowController', ControlRowController);

    ControlRowController.$inject = ['$state', '$scope', '$rootScope'];

    function ControlRowController($state, $scope, $rootScope) {
        var vm = this;

        vm.updateDays = function() {
            /*
             * A dirty hack to compensate for having to use $watch as datepicker
             * doesn't support ng-change. It checks if two calls fr updates were
             * made at the same time excluding milliseconds. When setting
             * start and end time simultaneously, updateDays would be called
             * unnecessarily.
             */
            var difference = vm.lastCall - new Date();
            if (vm.lastCall && difference <= 0) {
                return false;
            }
            vm.lastCall = new Date();

            var cities = [];
            angular.forEach(vm.citiesObj, function(city) {
                if (city.selected) {
                    cities.push(city.name);
                }
            });
            if (cities.length === 0) {
                cities = 'all';
            }
            if (vm.startDate && vm.endDate)
                vm.update(cities, vm.startDate, vm.endDate);
        };

        vm.toggleMenu = function(state) {
            if (vm.menus.open && vm.menus.state == state) {
                vm.closeMenu(state);
            } else {
                vm.openMenu(state);
            }
        };
        vm.openMenu = function(state) {
            vm.menus.open = true;
            vm.menus.state = state;
        };
        vm.closeMenu = function() {
            vm.menus.open = false;
            vm.menus.state = '';
        };

        vm.openSearch = function() {
            vm.search.open = true;
        };

        vm.closeSearch = function() {
            vm.search.open = false;
        };

        vm.today = function() {
            var now = new Date();
            vm.startDate = now;
            vm.endDate = now;
            if ($rootScope.isMobile) {
                vm.dateControl = false;
            }
        };

        vm.thisWeek = function() {
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
            if ($rootScope.isMobile) {
                vm.dateControl = false;
            }
        };

        vm.focusStartDate = function() {
            vm.startDateOpen = true;
        };

        vm.focusEndDate = function() {
            vm.endDateOpen = true;
        };

        vm.toggleDate = function() {
            vm.dateControl = !vm.dateControl;
        };

        vm.toggleSidemenu = function() {
            vm.sidemenu = !vm.sidemenu;
        };

        // grumble grumble grumble
        // Both of these have dirty hacks to play around the first time they are changed
        // There's a arbitrary change for both fields, when datepicker hooks onto them
        $scope.$watch('cr.startDate', function() {
            if (vm.startDateFirst === 2) {
                vm.updateDays();
            }
            vm.startDateFirst += 1;
        });
        $scope.$watch('cr.endDate', function() {
            if (vm.endDateFirst === 2) {
                vm.updateDays();
            }
            vm.endDateFirst += 1;
        });

        function init() {
            vm.state = $state.current.name;
            vm.menus = {
                open: false,
                state: '' // city, date
            };
            vm.search = {
              open: false
            };
            vm.citiesObj = [
                {
                    name: 'Turku'
                },
                {
                    name: 'Vaasa'
                },
                {
                    name: 'Jyvaskylä'
                },
                {
                    name: 'Helsinki'
                },
                {
                    name: 'Tampere'
                },
                {
                    name: 'Rauma'
                },
                {
                    name: 'Pori'
                },
                {
                    name: 'Lappeenranta'
                },
                {
                    name: 'Kuopio'
                },
                {
                    name: 'Joensuu'
                },
                {
                    name: 'Savonlinna'
                }
            ];
            vm.startDateOpen = false;
            vm.endDateOpen = false;
            // amount of cities before we reach the last row
            vm.lastRowCount = vm.citiesObj.length - (vm.citiesObj.length % 3);
            vm.dateControl = !$rootScope.isMobile;
            vm.sidemenu = false;
            vm.startDateFirst = 0;
            vm.endDateFirst = 0;
        }
        init();
    }
})();