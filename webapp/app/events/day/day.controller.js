(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('DayController', DayController);

    DayController.$inject = ['$stateParams', 'Events'];

    function DayController($stateParams, Events) {
        var vm = this;

        function loadEvents() {
            Events.getDay($stateParams.year, $stateParams.month, $stateParams.day)
                .success(function(response) {
                    vm.day = response;
                });
        }

        function init() {
            //loadEvents();
        }
        init();
    }
})();