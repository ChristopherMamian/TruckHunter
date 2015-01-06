'use strict';
var app = angular.module('angularRestfulAuth', ['ngStorage',
    'ngRoute',
    'google-maps'] );

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'AuthCtrl'
        }).
        when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'AuthCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'AuthCtrl'
        }).
        when('/me', {
            templateUrl: 'partials/me.html',
            controller: 'MeCtrl'
        }).
        when('/trucks', {
            templateUrl: 'partials/trucks.html',
            controller: 'TruckCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    }
]);