(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('WeekController', WeekController);

    WeekController.$inject = ['$stateParams', 'Events'];

    function WeekController($stateParams, Events) {
        var vm = this;

        function loadEvents() {
            Events.getDateList(vm.city, vm.year, vm.month, vm.day, vm.daterange)
                .success(function(response) {
                    vm.dates = response;
                })
                .error(function() {
                });
        }

        function init() {
            vm.city = $stateParams.city || 'all';
            vm.today = new Date();
            vm.year = $stateParams.year || vm.today.getFullYear();
            vm.month = $stateParams.month || vm.today.getMonth();
            vm.day = $stateParams.day || vm.today.getDate();
            vm.daterange = 7;
            loadEvents();
        }
        init();
    }
})();