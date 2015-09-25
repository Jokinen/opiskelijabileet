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
        this.getDateList = function(cities, year, month, day, daterange) {
            if (cities === 'all') {
                return $http.get('api/events/query?',
                    {
                        params: {
                            year:year,
                            month:month,
                            day:day,
                            daterange:daterange
                        }
                    }
                );
            } else {
                var cityString = '';
                angular.forEach(cities, function(city) {
                    cityString += city + ',';
                });
                cityString = cityString.substring(0, cityString.length - 1);
                return $http.get('api/events/query?',
                    {
                        params: {
                            cities: cityString,
                            year:year,
                            month:month,
                            day:day,
                            daterange:daterange
                        }
                    }
                );
            }
        };
    }
})();