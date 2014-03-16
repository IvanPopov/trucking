/*
 * Контроллер меню.
 * Отвечает за подсвечивание выделенного пункта меню.
 * 
 */
'use strict';

app.controller('NavbarController', function($scope, $location, $http, $rootScope, Auth) {

    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
        $http({
            url: $rootScope.CONFIG.apiUrl + "/api/catalogs",
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.CatalogsList = data;
        });

        $scope.logout = logout;
	    $scope.getClass = getClass;
    }

    // Подсветка текущего пункта меню, использовать так: <a ng-class="getClass('/tasks')" href="/tasks">Tasks</a>
    function getClass(path) {
        if ($location.path().substr(0, path.length) == path) {
            return "active";
        } else {
            return "";
        }
    };

	// Выходим
    function logout() {
	    Auth.logout();
    }
});
