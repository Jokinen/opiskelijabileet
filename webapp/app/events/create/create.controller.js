(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('events.CreateCtrl', CreateCtrl);

    CreateCtrl.$inject = ['$stateParams', '$rootScope', 'Events', 'Facebook'];

    function CreateCtrl($stateParams, $rootScope, Events, Facebook) {
        var vm = this;

        function createEvent(event) {
            Events.create(event)
                .success(function (groupId) {
                    alert.log("Event with name"+ groupId.name);
                })
                .error(function (error) {
                    alert("Creating event failed, look in browser's js console for the error");
                    vm.error = error;
                });
        }

        function loadFacebookEvent(facebookEventId) {
            Facebook.getEvent(facebookEventId)
                .success(function(event) {
                    vm.facebookEvent = event;
                    vm.event['name'] = event.name;
                    vm.event['description_fi'] = event.description;
                    vm.event['city'] = event.venue.city;
                    vm.event['place'] = event.location;
                    vm.event['owners'] = event.owner.name;
                    vm.event['start_time'] = event.start_time;
                    vm.event['end_time'] = event.end_time || '2015-10-01T23:00:00+0300';
                    //vm.event['image'] = event.cover.source;
                    vm.event['fb_url'] = 'https://facebook.com/events'+event.id;
                    vm.event['labels'] = ['bileet'];
                })
                .error(function() {
                    console.log("helllo");
                });
        }

        vm.submitEvent = function() {
            createEvent(vm.event);
        };

        vm.submitComplete = function(response) {
            console.log(response);
        };

        function init() {
            if ($stateParams.fbEventId) {
                loadFacebookEvent($stateParams.fbEventId);
            }
            vm.facebookEventId = '';
            vm.facebookEvent = {};
            vm.event = {};
        }
        init();
    }
})();