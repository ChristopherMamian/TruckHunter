'use strict';

/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('app', ['ngResource'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('http://localhost:3000/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================

    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          },
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      };
    });

    //================================================

    //================================================
    // Define all the routes
    //================================================
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    //================================================

  }) // end of config()
  .run(function($rootScope, $http){
    $rootScope.message = '';

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('http://localhost:3000/logout');
    };
  });


/**********************************************************************
 * Login controller
 **********************************************************************/
app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('http://localhost:3000/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/admin');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };
});



/**********************************************************************
 * Admin controller
 **********************************************************************/
app.controller('AdminCtrl', function($scope, $http) {
  // List of users got from the server
  $scope.users = [];

  // Fill the array to display it in the page
  $http.get('http://localhost:3000/users').success(function(users){
    for (var i in users)
      $scope.users.push(users[i]);
  });
});
// $(document).ready(function(){

// $.ajax({
//   //request from client at 9393 to server at 3000
//       url: 'http://localhost:3000/trucks',
//       type: 'get'
//     }).done(function(res) {
//       console.log(res);
//       console.log('success');
//     }).fail(function() {
//       console.log('fail');
//     });

// $.ajax({
//   //post from client at 9393 to server at 3000
//       url: 'http://localhost:3000/trucks/new',
//       type: 'post'
//     }).done(function() {
//       console.log('post success');
//     }).fail(function() {
//       console.log('fail');
//     });

// $.ajax({
//   //post from client at 9393 to server at 3000
//       url: 'http://localhost:3000/truck/549993771cf63e3cf9000001/edit',
//       type: 'put'
//     }).done(function(res) {
//       console.log('update success');
//     }).fail(function() {
//       console.log('fail');
//     });

// $.ajax({
//   //post from client at 9393 to server at 3000
//       url: 'http://localhost:3000/truck/549993771cf63e3cf9000001/delete',
//       type: 'delete'
//     }).done(function(res) {
//       console.log('delete success');
//     }).fail(function() {
//       console.log('fail');
//     });


// $.ajax({
// //request from client at 9393 to server at 3000
//     url: 'http://localhost:3000/users',
//     type: 'get'
//   }).done(function(res) {
//     console.log(res);
//     console.log('success');
//   }).fail(function() {
//     console.log('fail');
//   });

// $.ajax({
//   //post from client at 9393 to server at 3000
//       url: 'http://localhost:3000/users/new',
//       type: 'post'
//     }).done(function() {
//       console.log('post success');
//     }).fail(function() {
//       console.log('fail');
//     });

// $.ajax({
//   //post from client at 9393 to server at 3000
//       url: 'http://localhost:3000/users/followTruck',
//       type: 'put'
//     }).done(function() {
//       console.log('truck followed');
//     }).fail(function() {
//       console.log('fail');
//     });
// });
