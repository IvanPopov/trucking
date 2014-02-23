/*
 * Контроллер справочника, пока - какого-то конкретного
 * 
 * 
 */
'use strict';

app.controller('CatalogController', function ($scope, $location, $http, $rootScope, $routeParams) {

    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
        var catalogName = $routeParams.catalog;
        $http({
            url: $rootScope.CONFIG.apiUrl + "/api/catalogs/" + catalogName,
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.Catalog = data;
        });
    }
});
