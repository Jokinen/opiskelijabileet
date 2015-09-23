(function() {
    'use strict';

    angular
        .module('myApp')
        .service('Events', Events);

    Events.$inject = ['$http'];

    function Events($http) {
        this.getEvents = function(year, month, day) {
            return $http.get('api/events/as-dates/'+year+'/'+month+'/'+day);
        };
        this.getDay = function(year, month, day) {
            return $http.get('api/events/as-dates/'+year+'/'+month+'/'+day);
        };
        this.getDateList = function(city, year, month, day, daterange) {
            return $http.get('api/events/query?',
                {
                    params: {
                        city:city,
                        year:year,
                        month:month,
                        day:day,
                        daterange:daterange
                    }
                }
            );
        };
    }
})();