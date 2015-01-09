// 'use strict';

// angular.module('angularRestfulAuth')
//     app.factory('AuthFactory', ['$http', '$localStorage', function($http, $localStorage){
//         var baseUrl = "http://localhost:3000";

//         function changeUser(user) {
//             angular.extend(currentUser, user);
//         }

//         function urlBase64Decode(str) {
//             var output = str.replace('-', '+').replace('_', '/');
//             switch (output.length % 4) {
//                 case 0:
//                     break;
//                 case 2:
//                     output += '==';
//                     break;
//                 case 3:
//                     output += '=';
//                     break;
//                 default:
//                     throw 'Illegal base64url string!';
//             }
//             return window.atob(output);
//         }

//         function getUserFromToken() {
//             var token = $localStorage.token;
//             var user = {};
//             if (typeof token !== 'undefined') {
//                 var encoded = token.split('.')[1];
//                 user = JSON.parse(urlBase64Decode(encoded));
//             }
//             return user;
//         }

//         var currentUser = getUserFromToken();

//         return {
//             save: function(data, success, error) {
//                 $http.post(baseUrl + '/signin', data).success(success).error(error)
//             },
//             signin: function(data, success, error) {
//                 $http.post(baseUrl + '/authenticate', data).success(success).error(error)
//             },

//             me: function(success, error) {
//                 $http.get(baseUrl + '/me').success(success).error(error)
//             },

//             logout: function(success) {
//                 changeUser({});
//                 delete $localStorage.token;
//                 success();
//             }
//         };
//     }
// ])

// .factory('TruckFactory', ['$http', function($http){
//         var baseUrl = "http://localhost:3000";

//         return {
//             trucks: function(success, error) {
//                 $http.get(baseUrl + '/trucks').success(success).error(error);
//             },

//             follow: function(truckId) {
//                 $http.put(baseUrl + '/users/followTruck/' + truckId);
//             }
//         };
// }])

// .factory('FollowTruckFactory', ['$http', function($http){
//     var baseUrl = "http://localhost:3000";

//     return {

//     }

// }])

// .factory('FollowedTruckFactory', ['$http', function($http){
//     var baseUrl = "http://localhost:3000";

//     return {
//         followedTrucks: function(success, error){
//             $http.get(baseUrl + '/fuck').success(success).error(error);
//         }
//     };
// }])

// .factory('MarkerFactory', function () {

//     var markerId = 0;

//     function create(latitude, longitude) {
//         var marker = {
//             options: {
//                 animation: 4,
//                 labelAnchor: "28 -5",
//                 labelClass: 'markerlabel'
//             },
//             latitude: latitude,
//             longitude: longitude,
//             id: ++markerId
//         };
//         return marker;
//     }

//     function invokeSuccessCallback(successCallback, marker) {
//         if (typeof successCallback === 'function') {
//             successCallback(marker);
//         }
//     }


//     function createByCoords(latitude, longitude, successCallback) {
//         var marker = create(latitude, longitude);
//         invokeSuccessCallback(successCallback, marker);
//     }

//     function createByAddress(address, successCallback) {
//         var geocoder = new google.maps.Geocoder();
//         geocoder.geocode({'address' : address}, function (results, status) {
//             if (status === google.maps.GeocoderStatus.OK) {
//                 var firstAddress = results[0];
//                 var latitude = firstAddress.geometry.location.lat();
//                 var longitude = firstAddress.geometry.location.lng();
//                 var marker = create(latitude, longitude);
//                 invokeSuccessCallback(successCallback, marker);
//             } else {
//                 // alert("Unknown address: " + address);
//             }
//         });
//     }

//     function createByCurrentLocation(successCallback) {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function (position) {
//                 var marker = create(position.coords.latitude, position.coords.longitude);
//                 invokeSuccessCallback(successCallback, marker);
//             });
//         } else {
//             alert('Unable to locate current position');
//         }
//     }


//     return {
//         createByCoords: createByCoords,
//         createByAddress: createByAddress,
//         createByCurrentLocation: createByCurrentLocation
//     };

// });


