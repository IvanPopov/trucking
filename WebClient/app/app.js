/*#######################################################################


  #######################################################################*/

var app = angular.module('WebClientDB', ['ngCookies', 'xeditable']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
              templateUrl: '/app/views/main.html',
              controller: 'MainCtrl'
            })
        .when('/login', {
              templateUrl: '/app/views/loginForm.html',
              controller: 'LoginCtrl'
        })
        .when('/catalog/tools', {
            templateUrl: '/app/views/catalogTools.html',
            controller: 'CatalogToolsController'
        })
        .when('/catalog/:catalog', {
            templateUrl: '/app/views/catalog.html',
            controller: 'CatalogController'
        })
        .otherwise({ redirectTo: '/main' });
})
// Параметры OAuth-авторизации
.run(function ($rootScope) {
    $rootScope.CONFIG = {
        apiUrl: 'http://192.168.1.111:1337',
        clientId: 'web_v1',
        clientSecret: 'abc123456',
    };
})
.run(function ($cookieStore, $location, $http, $rootScope, Auth, editableOptions) {
    Auth.authenticate();

    // Для редактируемых полей в таблицах
    editableOptions.theme = 'bs3';
});