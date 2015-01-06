'use strict';

/* Controllers */

    app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthFactory', function($rootScope, $scope, $location, $localStorage, AuthFactory) {

        $scope.signin = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            AuthFactory.signin(formData, function(res) {
                $localStorage.token = res.data.token;
                $location.path('/me');
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };

        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            AuthFactory.save(formData, function(res) {
                $localStorage.token = res.data.token;
                if (!$localStorage.token) {
                    throw "not ok";
                }
                $location.path('/me');
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.logout = function() {
            AuthFactory.logout(function() {
                $location.path('/');
            }, function() {
                $rootScope.error = 'Failed to logout';
            });
        };
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'AuthFactory', function($rootScope, $scope, $location, AuthFactory) {
        $scope.me = function() {
            AuthFactory.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            });
        };
        $scope.me();
}])


.controller('MapCtrl', ['MarkerFactory', '$scope', function(MarkerFactory, $scope) {
    console.log(MarkerFactory);
        MarkerFactory.createByCoords(37.779277, -122.41927, function(marker) {
            marker.options.labelContent = 'San Francisco';
            $scope.sfMarker = marker;
        });

        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.sfMarker.latitude,
                longitude: $scope.sfMarker.longitude
            },
            zoom: 12,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.sfMarker);

        $scope.addCurrentLocation = function () {
            MarkerFactory.createByCurrentLocation(function(marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };

        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerFactory.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }

    }])

.controller('TruckCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'TruckFactory', function($rootScope, $scope, $location, $localStorage, TruckFactory) {

        $scope.trucks = function() {
            TruckFactory.trucks(function(res) {
                $scope.truckDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            });
        };
        $scope.trucks();
}]);


//every page 1 controller
//sometimes more than 1 controller
//create truck factory for trucks
//make auth factory
//user factory
//
