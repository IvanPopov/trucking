/*
* Справочник "Типы инструментов"
* 
* 
*/
'use strict';

app.controller('CatalogToolsController', function ($scope, $location, $http,
    $rootScope, $routeParams, simpleCatalogs, $filter) {

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

        $scope.newTool = {};
        $scope.toolGroups = simpleCatalogs.getToolGroups().query( function() {
            // Добавляем вариант "Не задано"
            $scope.toolGroups.push(
                {
                    id_toolgroup: null,
                    name: "Не задано"
                }
            );
        });
    }

    $scope.getGroupName = function (id_toolgroup) {
        var selected = $filter('filter')($scope.toolGroups, { id_toolgroup: id_toolgroup});
        return selected[0] != null ? selected[0].name :"Not set";
    };

    $scope.createTool = function (newTool) {
        // Иначе они сериализуются в JSON как строки, и сервер их не принимает
        newTool.rate = parseInt(newTool.rate);
        newTool.rate_sec = parseInt(newTool.rate_sec);
        newTool.id_toolgroup = parseInt(newTool.id_toolgroup);

        simpleCatalogs.getTools().create(newTool);
    };

    // ToDel
    $scope.checkName = function (data, id) {
        return true;
    };

    $scope.saveTool = function (data, id) {
        console.log(JSON.stringify(data));

        return $http({
            url: $rootScope.CONFIG.apiUrl + '/api/catalogs/tools/' + id,
            data: data,
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    $scope.saveField = function (name, value, id) {
        var data = {};
        data[name] = value;

        console.log(JSON.stringify(data));
        return $http({
            url: $rootScope.CONFIG.apiUrl + '/api/catalogs/tools/' + id,
            data: data,
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

});
