/*
* Справочник "Типы инструментов"
* 
* 
*/
'use strict';

app.controller('CatalogToolsController', function ($scope, $location, $http, $rootScope, $routeParams) {

    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
        // ToDo: вынести в сервис
        var catalogName = "Tools";
        $http({
            url: $rootScope.CONFIG.apiUrl + "/api/catalogs/" + catalogName,
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.Tools = data;
        });

        $http({
            url: $rootScope.CONFIG.apiUrl + "/api/catalogs/" + "Units",
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.Units = data;
        });
    }


    $scope.checkName = function (data, id) {
        return true;
    };

    $scope.saveTool = function (data, id) {
        console.log(JSON.stringify(data));

        return $http({
            url: $rootScope.CONFIG.apiUrl + '/api/catalogs/tools/' + id,
            data: data,
            method: "PATCH"
        });

        //return $http.post( $rootScope.CONFIG.apiUrl + '/api/catalogs/tools/' + id, data);
    };
});
