(function(){
    'use strict';

    angular
        .module('myApp')
        .service('Facebook', Facebook);

    Facebook.$inject = ['$http'];

    function Facebook($http) {
        this.getEvent = function(id) {
            return $http.get('facebook/event/'+id);
        }
    }
})();