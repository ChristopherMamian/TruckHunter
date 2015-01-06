'use strict';

/* Controllers */
//See comments at bottom of page for explanations.

    app.controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthFactory', function($rootScope, $scope, $location, $localStorage, AuthFactory) {

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

