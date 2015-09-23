(function() {
    'use strict';

    angular
        .module('myApp')
        .directive('controlRow', mainMenu);

    function mainMenu() {
        return {
            templateUrl: 'static/components/control-row/control-row.html',
            bindToController: true,
            controller: 'ControlRowController as cr',
            scope: {
                city: "=",
                year: "=",
                month: "=",
                day: "=",
                daterange: "="
            }
        }
    }
})();