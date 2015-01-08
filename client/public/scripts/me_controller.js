'use strict';
app.controller('MeCtrl', ['$rootScope', '$scope', '$location', '$http', 'AuthFactory', 'FollowedTruckFactory', function($rootScope, $scope, $location, $http, AuthFactory, FollowedTruckFactory) {
        var baseUrl = "http://localhost:3000";
        $scope.me = function() {
            AuthFactory.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            });
        };

        $scope.followedTrucks = function() {
            FollowedTruckFactory.followedTrucks(function(res) {
                $scope.myTrucks = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            });
        };

        $scope.me();
        $scope.followedTrucks();
}])