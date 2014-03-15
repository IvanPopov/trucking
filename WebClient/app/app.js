/*#######################################################################


  #######################################################################*/

var app = angular.module('WebClientDB', ['ngCookies', 'xeditable', 'ngResource', 'ngRoute', 'xx-http-error-handling']);

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
        .when('/catalog/naturalpersons', {
            templateUrl: '/app/views/catalogNaturalPersons.html',
            controller: 'CatalogNaturalPersonsController'
        })
        .when('/catalog/naturalpersons/:id_naturalperson', {
            templateUrl: '/app/views/naturalPerson.html',
            controller: 'NaturalPersonController'
        })
        .when('/catalog/:catalog/download', {
            templateUrl: '/app/views/catalog.html',
            controller: 'CatalogControllerDownloader'
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
        //apiUrl: 'http://192.168.1.111:1337',
        apiUrl: 'http://127.0.0.1:1337',
        clientId: 'web_v1',
        clientSecret: 'abc123456',
    };
})
.run(function ($cookieStore, $location, $http, $rootScope, Auth, editableOptions) {
    Auth.authenticate();

    // Для редактируемых полей в таблицах
    editableOptions.theme = 'bs3';
});