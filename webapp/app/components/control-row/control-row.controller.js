(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ControlRowController', ControlRowController);

    ControlRowController.$inject = ['$state'];

    function ControlRowController($state) {
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

        function init() {
            vm.state = $state.current.name;
            vm.menus = {
                open: false,
                state: '' // city, date
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
            // amount of cities before we reach the last row
            vm.lastRowCount = vm.citiesObj.length - (vm.citiesObj.length % 3);
        }
        init();
    }
})();