/*
 * Сервис, отвечающий за операции с простыми каталогами
 * 
 */
'use strict';

app.factory('simpleCatalogs', function ($rootScope, $resource) {
	var apiUrl = null;

	return init();

	// Вся инициализация в этом методе
	function init() {
		apiUrl = $rootScope.CONFIG.apiUrl;
		return {
			getWorkTypes: getWorkTypes,
			getPhones: getPhones,
			getTools: getTools,
			getToolGroups: getToolGroups,
			getUnits: getUnits,
			getMetroStations: getMetroStations,
			getMetroBranches: getMetroBranches
		};
	}

	function getPhones(personId) {
		return $resource(apiUrl + "/api/naturalPersons/" + personId + "/phones/:phone", {},
		{
			'create': { method: 'post', url: apiUrl + "/api/naturalPersons/" + personId + "/phones/" }
		});
	}
	
	// Группы типов инструментов
	function getToolGroups() {
		return $resource(apiUrl + "/api/catalogs/tools/groups/:group", {
			worktype: '@worktype'
		},
		{
			'create': { method: 'post', url: apiUrl + "/api/catalogs/tools/groups" }
		});
	}
   
	// Типы работ
	function getWorkTypes() {
		return $resource(apiUrl + "/api/catalogs/worktypes/:worktype", {
			worktype: '@worktype'
		},
		{
			'save': { method: 'PATCH' }
		});
	}

	// Типы инструментов
	function getTools() {
		return $resource(apiUrl + "/api/catalogs/tools/:id", {
			id: '@id'
		},
		{
			'save': { method: 'PATCH' },
			'create': { method: 'post', url: apiUrl + "/api/catalogs/tools/" }
		});
	}

	// Единицы измерения
	function getUnits() {
		return $resource(apiUrl + "/api/catalogs/Units/:id", {
			id: '@id'
	   });
	}

	function getMetroStations() {
		var path = "/api/metro/stations/";
		return $resource(apiUrl + path + ":id", {
			id: '@id'
		},
		{
			'save': { method: 'PATCH' },
			'create': { method: 'post', url: apiUrl + path }
		});
	}

	function getMetroBranches() {
		var path = "/api/metro/branches/";
		return $resource(apiUrl + path + ":id", {
			id: '@id'
		},
		{
			'save': { method: 'PATCH' },
			'create': { method: 'post', url: apiUrl + path }
		});
	}

	// ToDo: /api/catalogs/worktypes/groups
});
