(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ControlRowController', ControlRowController);

    ControlRowController.$inject = ['$state', '$scope'];

    function ControlRowController($state, $scope) {
        var vm = this;

        vm.updateDays = function() {
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
            vm.updateDays();
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
            vm.updateDays();
        };

        vm.focusStartDate = function() {
            vm.startDateOpen = true;
        };

        vm.focusEndDate = function() {
            vm.endDateOpen = true;
        };

        // grumble grumble grumble
        $scope.$watch('cr.startDate', function() {
            vm.updateDays();
        });
        $scope.$watch('cr.endDate', function() {
            vm.updateDays();
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
        }
        init();
    }
})();