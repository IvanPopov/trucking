/*
* Справочник "Типы инструментов"
* 
* 
*/
'use strict';

app.controller('CatalogToolsController', function ($scope, $rootScope, simpleCatalogs,
    $filter) {

    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
        $scope.Tools = simpleCatalogs.getTools().query();
        $scope.Units = simpleCatalogs.getUnits().query();

        $scope.newTool = {};
        $scope.toolGroups = simpleCatalogs.getToolGroups().query(function () {
        	// Добавляем вариант "Не задано"
            $scope.toolGroups.push(
                {
                    id_toolgroup: null,
                    name: "Не задано"
                }
            );
        });
	    $scope.selectedGroup = null; // Фильтрация по группе, для меню слева
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

    $scope.saveTool = function (data, id) {
        var tool = simpleCatalogs.getTools().get({ id: id }, function () {
            for (var k in data) tool[k] = data[k];
            tool.$save({ id: id });
        });
    };

    $scope.saveField = function (name, value, id) {
        var tool = simpleCatalogs.getTools().get({ id: id }, function () {
            tool[name] = value;
            tool.$save({ id: id });
        });
    };
});
