(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('EventsCtrl', EventsCtrl);

    EventsCtrl.$inject = [];

    function EventsCtrl() {
        var vm = this;

        function init() {}
        init();
    }
})();