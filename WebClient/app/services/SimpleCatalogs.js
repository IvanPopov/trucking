﻿/*
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
			getMetroBranches: getMetroBranches,

			getTerritorialSigns: getTerritorialSigns,
			getMetroStreets: getMetroStreets,
			getStreetMetroStations: getStreetMetroStations,
			getStreets: getStreets
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
	
	//ресурс территориальных признаков
	function getTerritorialSigns() {
		var path = "/api/territorialsigns/";
		return $resource(apiUrl + path + ":id", {
			id: '@id'
		},
		{
			'save': { method: 'PATCH' },
			'create': { method: 'post', url: apiUrl + path }
		});
	}

	//ресурс улиц пренадлежащих станциям метро
	function getMetroStreets() {
		var path = "/api/metro/stations/:id_metro/streets/";
		return $resource(apiUrl + path + ":id_street", {
			id_metro: '@id_metro',
			id_street: '@id_street',
		},
		{
			'save': { method: 'PATCH' },
			'create': { method: 'post', url: apiUrl + path }
		});
	}

	//ресурс станций метро пренадлежащих улицам
	function getStreetMetroStations() {
		var path = "/api/streets/:id_street/metro/stations/";
		return $resource(apiUrl + path + ":id_metro", {
			id_metro: '@id_metro',
			id_street: '@id_street',
		},
		{
			'save': { method: 'PATCH' },
			'create': { method: 'post', url: apiUrl + path }
		});
	}

	function getStreets() {
		return $resource(apiUrl + "/api/streets/:id", {
			id: '@id'
		},
		{
			'save': { method: 'PATCH' },
			'create': { method: 'post' }
		});
	}

	// ToDo: /api/catalogs/worktypes/groups
});
