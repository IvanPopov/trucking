'use strict';

app.controller('CatalogMetroBranchesController', function ($scope, $location, $http, $rootScope, $routeParams, simpleCatalogs) {
	init();

	function init() {
		$scope.metroBranches = simpleCatalogs.getMetroBranches().query();
	}
});