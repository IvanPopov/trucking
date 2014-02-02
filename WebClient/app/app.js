/*#######################################################################


  #######################################################################*/

var app = angular.module('WebClientDB', ['ngCookies']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/CreateOrder', {
                controller: 'CreateOrder',
                templateUrl: '/app/partials/createOrder.html'
            })
        .when('/', {
              templateUrl: '/app/views/main.html',
              controller: 'MainCtrl'
            })
        .when('/login', {
              templateUrl: '/app/views/loginForm.html',
              controller: 'LoginCtrl'
            })
        .when('/logout', {
              templateUrl: '/app/views/logout.html',
              controller: 'LogoutCtrl'
            })
        .otherwise({ redirectTo: '/login' });
})
// Параметры OAuth-авторизации
.run(function ($rootScope) {
    $rootScope.CONFIG = {
        apiUrl: 'http://192.168.1.111:1337',
        clientId: 'web_v1',
        clientSecret: 'abc123456',
    };
})
.run(function ($cookieStore, $location, $http, $rootScope, Auth) {
    Auth.authenticate();
});