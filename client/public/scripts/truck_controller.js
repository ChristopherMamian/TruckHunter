app.controller('TruckCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'TruckFactory', function($rootScope, $scope, $location, $localStorage, TruckFactory) {

        $scope.getTrucks = function() {
            console.log("get trucks");
            TruckFactory.trucks(function(res) {
                $scope.trucks = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            });
        };


        $scope.followTruck = function(truckId) {
            TruckFactory.follow(truckId);
        };

        $scope.filter = {};

        $scope.getOptionsFor = function (propName) {
            return ($scope.trucks || []).map(function (truck) {
                return truck[propName];
            }).filter(function (truck, index, arr) {
                return arr.indexOf(truck) === index;
            });
        };

        $scope.filterByProperties = function (truck) {
            var matchesAND = true;
            for (var prop in $scope.filter) {
                // if (noSubFilter($scope.filter[prop])) continue;
                if (noSubFilter($scope.filter[prop])) continue;
                // if (!$scope.filter[prop][truck[prop]]) {
                if (!$scope.filter[prop][truck[prop]]) {
                    matchesAND = false;
                    break;
                }
            }
            return matchesAND;

        };

        function noSubFilter(subFilterObj) {
            for (var key in subFilterObj) {
                if (subFilterObj[key]) return false;
            }
            return true;
        }

        // $scope.getTrucks();

}]);

app.filter('capitalizeFirst', function () {
    return function (str) {
        str = str || '';
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    };
});