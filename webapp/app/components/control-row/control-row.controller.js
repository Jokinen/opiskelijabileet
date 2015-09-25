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
            vm.update(cities, vm.startDate, vm.endDate);
        };

        vm.toggleMenu = function(index) {
            if (vm.menus[index].active) {
                vm.closeMenu(index);
            } else {
                vm.openMenu(index);
            }
        };
        vm.openMenu = function(index) {
            vm.menus[index].active = true;
        };
        vm.closeMenu = function(index) {
            vm.menus[index].active = false;
        };

        function init() {
            vm.state = $state.current.name;
            vm.menus = [
                {
                    name: 'date',
                    active: false
                },
                {
                    name: 'week',
                    active: false
                },
                {
                    name: 'month',
                    active: false
                }
            ];
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