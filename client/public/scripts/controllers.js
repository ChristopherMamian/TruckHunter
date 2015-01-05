'use strict';

/* Controllers */

// angular.module('angularRestfulAuth')
    app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {

        $scope.signin = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            Main.signin(formData, function(res) {
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

            Main.save(formData, function(res) {
                $localStorage.token = res.data.token;
                if (!$localStorage.token) {
                    throw "not ok";
                }
                $location.path('/me');
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.logout = function() {
            Main.logout(function() {
                $location.path('/');
            }, function() {
                $rootScope.error = 'Failed to logout';
            });
        };
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        });
}])

.controller('MapCtrl', ['MarkerMaker', '$scope', function(MarkerMaker, $scope) {
    console.log(MarkerMaker);
        MarkerMaker.createByCoords(37.779277, -122.41927, function(marker) {
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
            MarkerMaker.createByCurrentLocation(function(marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };

        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerMaker.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }

    }]);

