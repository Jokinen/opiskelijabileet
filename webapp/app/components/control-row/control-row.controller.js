(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ControlRowController', ControlRowController);

    ControlRowController.$inject = ['$state', '$stateParams'];

    function ControlRowController($state, $stateParams) {
        var vm = this;

        function getPartials(date) {
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + (date.getDate())).slice(-2);
            return [year, month, day]
        }
        vm.setState = function(state) {
            var startDate = new Date($stateParams.year, $stateParams.month, $stateParams.day, 0, 0, 0, 0);
            var partials = getPartials(startDate);
            var year = partials[0];
            var month = partials[1];
            var day = partials[2];
            if (state === 'events.day') {
                $state.go('events.day', {year:year, month:month, day:day});
                vm.state = 'events.day';
                vm.date = new Date(year, month, day);
            }
            else if (state === 'events.week') {
                var weekday = startDate.getDay(); // 0 = sunday, 1 = monday...
                /*
                 * 0 = sunday, 1 = monday...
                 * -- > 0 = monday, 1 = tuesday
                 */
                if (startDate.getDay() === 0) {
                    weekday = 6;
                } else {
                    weekday = weekday - 1
                }
                var weekStart = new Date(new Date().setDate(startDate.getDate()-weekday));
                partials = getPartials(weekStart);
                year = partials[0];
                month = partials[1];
                day = partials[2];
                $state.go('events.week', {year:year, month:month, day:day, range:7});
                vm.state = 'events.week';
            } else {
                console.log(state + ' does not exist')
            }
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
            //vm.setState($state.current.name);
            if ($stateParams.year && $stateParams.month && $stateParams.day) {
                if ($stateParams.range) {

                } else {

                }
            }
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
        }
        init();
    }
})();