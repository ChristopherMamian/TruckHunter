app.factory('TruckFactory', ['$http', function($http){
        var baseUrl = "http://localhost:3000";

        return {
            trucks: function(success, error) {
                $http.get(baseUrl + '/trucks').success(success).error(error);
            },

            follow: function(truckId) {
                $http.put(baseUrl + '/users/followTruck/' + truckId);
            }
        };
}])