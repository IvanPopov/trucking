/*
* Справочник "Типы инструментов"
* 
* 
*/
'use strict';

app.controller('CatalogToolsController', function ($scope, $rootScope, simpleCatalogs,
    $filter, ngTableParams, $location) {

	var groupSelected = null;

    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
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

		// Данные для таблицы с фильтрами и пагинатором
        $scope.tableParams = new ngTableParams(
			{
				page: 1, // show first page
				count: 3, // ToDo: поменять на 15 после отладки
				sorting: { name: 'asc' }, // initial sorting
				group: 0,
				extended: true // Чтобы наш сервер вернул объект, содержащий поля items, total, ...
			},
			{
				total: 0, // length of data
				getData: function ($defer, params) {
					simpleCatalogs.getTools().get(params.url(), function (data) {
						$location.search(params.url()); // Сохраняем параметры в строку URL
						params.total(data.total); // Общее число записей, чтобы работал pagination
						$defer.resolve(data.items); // Записи выбранной страницы
					});
				},
				$scope: { $data: {} } // Волшебный костыль, без него ng-table выдает ошибку
		});
    }

    $scope.SelectGroup = function (id_toolgroup) {
    	groupSelected = id_toolgroup;
	    $scope.tableParams.parameters({ group: id_toolgroup });
    	$scope.tableParams.reload();
    };
    $scope.IsGroupSelected = function (id_toolgroup) {
    	return groupSelected === id_toolgroup;
    };

    $scope.getGroupName = function (id_toolgroup) {
        var selected = $filter('filter')($scope.toolGroups, { id_toolgroup: id_toolgroup});
        return selected[0] != null ? selected[0].name :"Not set";
    };

    function parseIntValues(tool) {
		// Иначе они сериализуются в JSON как строки, и сервер их не принимает
		tool.rate = parseInt(tool.rate);
		tool.rate_sec = parseInt(tool.rate_sec);
		tool.id_toolgroup = parseInt(tool.id_toolgroup);
    }

    $scope.createTool = function (newTool) {
    	parseIntValues(newTool);
        simpleCatalogs.getTools().create(newTool);
    };

    $scope.saveTool = function (data, id) {
    	parseIntValues(data);
    	simpleCatalogs.getTools().save({ id: id }, data, function () {
    		$scope.tableParams.reload();
    	});
    };

    $scope.removeTool = function (id) {
    	simpleCatalogs.getTools().remove({ id: id }, function () {
    		$scope.tableParams.reload();
    	});
    };
    $scope.$on('$routeUpdate', function (scope, next, current) {
    	if (!angular.equals(next.params, $scope.tableParams.url())) {
    		$scope.tableParams.parameters(next.params, true);
			$scope.tableParams.reload();
		}
    });
});
