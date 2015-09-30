"use strict";angular.module("myApp",["ui.router","datePicker","angularMoment"]).config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("homeview",{url:"/",templateUrl:"static/events/day-range/day-range.html",controller:"DayRangeController",controllerAs:"dr"}).state("events",{url:"/events?city&year&month&day&range",templateUrl:"static/events/events.html",controller:"EventsCtrl",controllerAs:"events"})}]),angular.module("myApp").run(["$rootScope","amMoment",function($rootScope,amMoment){amMoment.changeLocale("fi"),$rootScope.isMobile=function(){var check=!1;return function(a){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))&&(check=!0)}(navigator.userAgent||navigator.vendor||window.opera),check}()}]),function(){function ControlRowController($state,$scope,$rootScope){function init(){vm.state=$state.current.name,vm.menus={open:!1,state:""},vm.search={open:!1},vm.citiesObj=[{name:"Turku"},{name:"Vaasa"},{name:"Jyvaskylä"},{name:"Helsinki"},{name:"Tampere"},{name:"Rauma"},{name:"Pori"},{name:"Lappeenranta"},{name:"Kuopio"},{name:"Joensuu"},{name:"Savonlinna"}],vm.startDateOpen=!1,vm.endDateOpen=!1,vm.lastRowCount=vm.citiesObj.length-vm.citiesObj.length%3,vm.dateControl=!$rootScope.isMobile,vm.sidemenu=!1}var vm=this;vm.updateDays=function(){var cities=[];angular.forEach(vm.citiesObj,function(city){city.selected&&cities.push(city.name)}),0===cities.length&&(cities="all"),vm.startDate&&vm.endDate&&vm.update(cities,vm.startDate,vm.endDate)},vm.toggleMenu=function(state){vm.menus.open&&vm.menus.state==state?vm.closeMenu(state):vm.openMenu(state)},vm.openMenu=function(state){vm.menus.open=!0,vm.menus.state=state},vm.closeMenu=function(){vm.menus.open=!1,vm.menus.state=""},vm.openSearch=function(){vm.search.open=!0},vm.closeSearch=function(){vm.search.open=!1},vm.today=function(){var now=new Date;vm.startDate=now,vm.endDate=now,vm.updateDays(),$rootScope.isMobile&&(vm.dateControl=!1)},vm.thisWeek=function(){var startDate=new Date,weekday=startDate.getDay();0===weekday?weekday=6:weekday-=1,vm.startDate=new Date((new Date).setDate(startDate.getDate()-weekday)),vm.endDate=new Date((new Date).setDate(vm.startDate.getDate()+6)),vm.updateDays(),$rootScope.isMobile&&(vm.dateControl=!1)},vm.focusStartDate=function(){vm.startDateOpen=!0},vm.focusEndDate=function(){vm.endDateOpen=!0},vm.toggleDate=function(){vm.dateControl=!vm.dateControl},vm.toggleSidemenu=function(){vm.sidemenu=!vm.sidemenu},$scope.$watch("cr.startDate",function(){vm.startDateFirst&&vm.updateDays(),vm.startDateFirst=!0}),$scope.$watch("cr.endDate",function(){vm.endDateFirst&&vm.updateDays(),vm.endDateFirst=!0}),init()}angular.module("myApp").controller("ControlRowController",ControlRowController),ControlRowController.$inject=["$state","$scope","$rootScope"]}(),function(){function mainMenu(){return{templateUrl:"static/components/control-row/control-row.html",bindToController:!0,controller:"ControlRowController as cr",scope:{city:"=",startDate:"=",endDate:"=",update:"=",visibleFilter:"="}}}angular.module("myApp").directive("controlRow",mainMenu)}(),function(){function EventsCtrl(){function init(){}init()}angular.module("myApp").controller("EventsCtrl",EventsCtrl),EventsCtrl.$inject=[]}(),function(){function Events($http){this.getEvents=function(year,month,day){return $http.get("api/events/as-dates/"+year+"/"+month+"/"+day)},this.getDay=function(year,month,day){return $http.get("api/events/as-dates/"+year+"/"+month+"/"+day)},this.getDateList=function(cities,year,month,day,daterange){if("all"===cities)return $http.get("api/events/query?",{params:{year:year,month:month,day:day,daterange:daterange}});var cityString="";return angular.forEach(cities,function(city){cityString+=city+","}),cityString=cityString.substring(0,cityString.length-1),$http.get("api/events/query?",{params:{cities:cityString,year:year,month:month,day:day,daterange:daterange}})}}angular.module("myApp").service("Events",Events),Events.$inject=["$http"]}(),function(){function DayController($stateParams,Events){function init(){}init()}angular.module("myApp").controller("DayController",DayController),DayController.$inject=["$stateParams","Events"]}(),function(){function DayRangeController($stateParams,Events){function loadEvents(cities,startDate,endDate){var dateRange=Math.round((endDate-startDate)/864e5);Events.getDateList(cities,startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate(),dateRange+1).success(function(response){vm.dates=response}).error(function(){})}function init(){$stateParams.cities?vm.cities=$stateParams.cities:vm.cities="all";var startDate=new Date,weekday=startDate.getDay();0===weekday?weekday=6:weekday-=1,vm.startDate=new Date((new Date).setDate(startDate.getDate()-weekday)),vm.endDate=new Date((new Date).setDate(vm.startDate.getDate()+6)),vm.selectedEvent={active:!1,event:{}},vm.visibleFilter="",loadEvents(vm.cities,vm.startDate,vm.endDate)}var vm=this;vm.updateEvents=function(city,startDate,endDate){loadEvents(city,startDate,endDate)},vm.openEvent=function(day,event){var dayIndex=vm.dates.indexOf(day),eventIndex=vm.dates[dayIndex].events.indexOf(event);vm.selectedEvent.active||(vm.dates[dayIndex].events[eventIndex].selected=!0,vm.selectedEvent={active:!0,day:day,event:event})},vm.closeEvent=function(){var dayIndex=vm.dates.indexOf(vm.selectedEvent.day),eventIndex=vm.dates[dayIndex].events.indexOf(vm.selectedEvent.event);vm.dates[dayIndex].events[eventIndex].selected=!1,vm.selectedEvent.active=!1},init()}angular.module("myApp").controller("DayRangeController",DayRangeController),DayRangeController.$inject=["$stateParams","Events"]}();