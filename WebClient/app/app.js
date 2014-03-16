/*#######################################################################


  #######################################################################*/

var app = angular.module('WebClientDB', ['ngCookies', 'xeditable', 'ngResource', 'ngTable',
	'ngRoute', 'xx-http-error-handling']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
	$routeProvider
		.when('/main', {
			  templateUrl: '/app/views/main.html',
			  controller: 'MainCtrl',
			  resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
			})
		.when('/login', {
			  templateUrl: '/app/views/loginForm.html',
			  controller: 'LoginCtrl'
		})
		.when('/catalog/tools', {
			templateUrl: '/app/views/catalogTools.html',
			controller: 'CatalogToolsController',
			resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
		})
		.when('/catalog/metro', {
			templateUrl: '/app/views/catalogMetroStations.html',
			controller: 'CatalogMetroStationsController',
			resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
		})
		.when('/catalog/metrobranches', {
			templateUrl: '/app/views/catalogMetroBranches.html',
			controller: 'CatalogMetroBranchesController',
			resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
		})
		.when('/catalog/naturalpersons', {
			templateUrl: '/app/views/catalogNaturalPersons.html',
			controller: 'CatalogNaturalPersonsController',
			resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
		})
		.when('/catalog/naturalpersons/:id_naturalperson', {
			templateUrl: '/app/views/naturalPerson.html',
			controller: 'NaturalPersonController',
			resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
		})
		.when('/catalog/:catalog/download', {
			templateUrl: '/app/views/catalog.html',
			controller: 'CatalogControllerDownloader',
			resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
		})
		.when('/catalog/:catalog', {
			templateUrl: '/app/views/catalog.html',
			controller: 'CatalogController',
			resolve: { key: ['Auth', function (s) { return s.authenticate(); }] }
		})
		.otherwise({ redirectTo: '/main' });
})

//TODO: Turn off OPTIONS request for angular $resource.
//view http://stackoverflow.com/questions/12111936/angularjs-performs-an-options-http-request-for-a-cross-origin-resource/12112294
//.config(['$httpProvider', function ($httpProvider) {

//	$httpProvider.defaults.useXDomain = true;
//	delete $httpProvider.defaults.headers.common['X-Requested-With'];
//}])
	//.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
	//	$sceDelegateProvider.resourceUrlWhitelist([
	//		'self', 'http://127.0.0.1:1337/**'
	//	]);
	//}])
// Параметры OAuth-авторизации
.run(function ($rootScope) {
	$rootScope.CONFIG = {
		//apiUrl: 'http://192.168.1.111:1337',
		apiUrl: 'http://127.0.0.1:1337',
		clientId: 'web_v1',
		clientSecret: 'abc123456'
	};
})
.run(function (editableOptions) {
	// Чтобы библиотека x-editable(для редактирования таблиц) работала с 3 bootstrap
	editableOptions.theme = 'bs3';
});