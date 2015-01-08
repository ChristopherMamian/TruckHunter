'use strict';
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