'use strict';
app.factory('FollowedTruckFactory', ['$http', function($http){
    var baseUrl = "http://localhost:3000";

    return {
        followedTrucks: function(success, error){
            $http.get(baseUrl + '/fuck').success(success).error(error);
        }
    };
}])