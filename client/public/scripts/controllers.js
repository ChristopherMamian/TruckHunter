// 'use strict';

/* Controllers */
//See comments at bottom of page for explanations.

    // app.controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthFactory', function($rootScope, $scope, $location, $localStorage, AuthFactory) {

    //     $scope.signin = function() {
    //         var formData = {
    //             email: $scope.email,
    //             password: $scope.password
    //         }

    //         AuthFactory.signin(formData, function(res) {
    //             $localStorage.token = res.data.token;
    //             $location.path('/me');
    //         }, function() {
    //             $rootScope.error = 'Failed to signin';
    //         })
    //     };

    //     $scope.signup = function() {
    //         var formData = {
    //             email: $scope.email,
    //             password: $scope.password
    //         }

    //         AuthFactory.save(formData, function(res) {
    //             $localStorage.token = res.data.token;
    //             if (!$localStorage.token) {
    //                 throw "not ok";
    //             }
    //             $location.path('/me');
    //         }, function() {
    //             $rootScope.error = 'Failed to signup';
    //         })
    //     };

    //     $scope.logout = function() {
    //         AuthFactory.logout(function() {
    //             $location.path('/');
    //         }, function() {
    //             $rootScope.error = 'Failed to logout';
    //         });
    //     };
    // }])

// .controller('MeCtrl', ['$rootScope', '$scope', '$location', '$http', 'AuthFactory', 'FollowedTruckFactory', function($rootScope, $scope, $location, $http, AuthFactory, FollowedTruckFactory) {
//         var baseUrl = "http://localhost:3000";
//         $scope.me = function() {
//             AuthFactory.me(function(res) {
//                 $scope.myDetails = res;
//             }, function() {
//                 $rootScope.error = 'Failed to fetch details';
//             });
//         };

//         $scope.followedTrucks = function() {
//             FollowedTruckFactory.followedTrucks(function(res) {
//                 $scope.myTrucks = res;
//             }, function() {
//                 $rootScope.error = 'Failed to fetch details';
//             });
//         };

//         $scope.me();
//         $scope.followedTrucks();
// }])


// .controller('MapCtrl', ['MarkerFactory', 'TruckFactory', '$scope', function(MarkerFactory, TruckFactory, $scope) {


//     // $scope.$parent.$watch("trucks", function(newValue, oldValue) {
//     //     var trucks = $scope.$parent.trucks;
//     //     if (trucks.length > 0) {
//     //         for(var i = 0; i < trucks.length; i++){
//     //             var address = trucks[i].currentAddress;
//     //             var name = trucks[i].truckName;
//     //             if (address) {
//     //                 MarkerFactory.createByAddress(address, function(marker) {
//     //                     marker.options.labelContent = name;
//     //                     $scope.map.markers.push(marker);
//     //                     refresh(marker);
//     //                 });
//     //             }
//     //         }
//     //     }
//     // });

//     $scope.$parent.$watch("filteredTrucks", function(newValue, oldValue) {

//         // $scope.map.markers = [];
//         var filteredTrucks = $scope.$parent.filteredTrucks;
//         if (filteredTrucks && filteredTrucks.length > 0) {
//             for(var i = 0; i < filteredTrucks.length; i++){
//                 var address = filteredTrucks[i].currentAddress;
//                 var name = filteredTrucks[i].truckName;
//                 if (address) {
//                     MarkerFactory.createByAddress(address, function(marker) {
//                         marker.options.labelContent = name;
//                         $scope.map.markers.push(marker);
//                         refresh(marker);
//                     });
//                 }
//             }
//         }
//     });

//     $scope.$parent.$watch("myTrucks", function(newValue, oldValue) {
//         var myTrucks = $scope.$parent.myTrucks;
//         if (myTrucks && myTrucks.length > 0) {
//             for(var i = 0; i < myTrucks.length; i++){
//                 var address = myTrucks[i].currentAddress;
//                 if (address) {
//                     MarkerFactory.createByAddress(address, function(marker) {
//                         $scope.map.markers.push(marker);
//                         refresh(marker);
//                     });
//                 }
//             }
//         }
//     });

//         MarkerFactory.createByCoords(37.779277, -122.41927, function(marker) {
//             $scope.sfMarker = marker;
//         });

//         $scope.address = '';

//         $scope.map = {
//             center: {
//                 latitude: $scope.sfMarker.latitude,
//                 longitude: $scope.sfMarker.longitude
//             },
//             zoom: 12,
//             markers: [],
//             control: {},
//             options: {
//                 scrollwheel: false
//             }
//         };

//         $scope.map.markers.push($scope.sfMarker);

//         $scope.addCurrentLocation = function () {
//             MarkerFactory.createByCurrentLocation(function(marker) {
//                 marker.options.labelContent = 'You´re here';
//                 $scope.map.markers.push(marker);
//                 refresh(marker);
//             });
//         };

//         $scope.addAddress = function() {
//             //add addresses here from truckFactory
//             var address = $scope.address;
//             if (address !== '') {
//                 MarkerFactory.createByAddress(address, function(marker) {
//                     $scope.map.markers.push(marker);
//                     refresh(marker);
//                 });
//             }
//         };

//         function refresh(marker) {
//             $scope.map.control.refresh({latitude: marker.latitude,
//                 longitude: marker.longitude});
//         }

//     }])

// .controller('TruckCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'TruckFactory', function($rootScope, $scope, $location, $localStorage, TruckFactory) {

//         $scope.getTrucks = function() {
//             TruckFactory.trucks(function(res) {
//                 $scope.trucks = res;
//             }, function() {
//                 $rootScope.error = 'Failed to fetch details';
//             });
//         };


//         $scope.followTruck = function(truckId) {
//             TruckFactory.follow(truckId);
//         };

//         $scope.filter = {};

//         $scope.getOptionsFor = function (propName) {
//             return ($scope.trucks || []).map(function (truck) {
//                 return truck[propName];
//             }).filter(function (truck, index, arr) {
//                 return arr.indexOf(truck) === index;
//             });
//         };

//         $scope.filterByProperties = function (truck) {
//             var matchesAND = true;
//             for (var prop in $scope.filter) {
//                 // if (noSubFilter($scope.filter[prop])) continue;
//                 if (noSubFilter($scope.filter[prop])) continue;
//                 // if (!$scope.filter[prop][truck[prop]]) {
//                 if (!$scope.filter[prop][truck[prop]]) {
//                     matchesAND = false;
//                     break;
//                 }
//             }
//             return matchesAND;

//         };

//         function noSubFilter(subFilterObj) {
//             for (var key in subFilterObj) {
//                 if (subFilterObj[key]) return false;
//             }
//             return true;
//         }

//         $scope.getTrucks();

// }]);

// app.filter('capitalizeFirst', function () {
//     return function (str) {
//         str = str || '';
//         return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
//     };
// });



/*
The AuthCtrl
 is the controller that handles user auth. Depending on the view, it will login, signup, or logout a user. We are injecting a factory called AuthFactory from the factories.js file. Now we have access to the functionality of the factory within the controller. The factory helps keep the controller cleaner. We are using $rootScope here for error messages, $scope to add some variables to the scope of the controller / views related to that controller. $location is used to provide a redirect path. For example, once a user signs in they will be redirected to the "/me" route. When a user logs out they will be redirected to the "/" home page. $localStorage is used to store our user tokens
*/

/*
The MapCtrl
 Read the tutorials I sent out online for further explanations on the map controller. The map controller creates the map using our given lat/long center point(SF). The map controller also adds the pins to the map using the MarkerFactory that is injected into the controller.
*/

/*
The MapCtrl
 Read the tutorials I sent out online for further explanations on the map controller. The map controller creates the map using our given lat/long center point(SF). The map controller also adds the pins to the map using the MarkerFactory that is injected into the controller.
*/

/*
The MeCtrl
 The Me controller also depends on the AuthFactory because it needs the token as well. Users cannot access the /me route unless they have been authenticated and the AuthFactory checks that for us. The Me Ctrl also grabs user info for us through the AuthFactory. If you look at the return in the AuthFactory you will see that it has the following
            me: function(success, error) {
                $http.get(baseUrl + '/me').success(success).error(error)
            }
 This hits the server for us and grabs the users information(name, followedTrucks, etc) which we use on line 51 of this file --> $scope.myDetails = res; <--.
*/

