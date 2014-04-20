app.controller('CatalogMetroBranchesController', function (
	$scope, $location, $http, $rootScope, $resource,
	$routeParams, simpleCatalogs, $q, $filter, ngTableParams, $timeout, $compile) {

	var metroStationsResource = simpleCatalogs.getMetroStations();
	var metroBranchesResource = simpleCatalogs.getMetroBranches();

	$scope.metroStations = metroStationsResource.query();
	$scope.metroBranches = metroBranchesResource.query();

	$q.all([$scope.metroBranches.$promise, $scope.metroBranches.$promise]).then(function () {
		$scope.stylizeColorInput = function (scope) {
			var $p = this.$editable.elem.parent().find("input:first");

			var button = angular.element(
				"<button colorpicker ng-style=\"{'background-color': $data, 'border': 0}\" ng-model=\"$data\" class=\"btn btn-info\">" +
				"pick" +
				"</button>");
			var el = $compile(button)(scope);

			//<input type="text" name="color"   ng-model="$data">

			$timeout(function () {
				$p.replaceWith(el);
			}, 0);
		}
	});

	$scope.save = function (branch, data) {
		for (var i in data) {
			branch[i] = data[i];
		}

		if (!$scope.inserted) {
			//save existing resource.
			metroBranchesResource.save({ id: branch.id_metrobranch }, branch,
				function () {
					//success
				},
				function () {
					$scope.tableParams.reload();
				});
		}
		else {
			//creating new resource.

			metroBranchesResource.create(branch,
				function (branch) {
					$scope.inserted = null;
					$scope.tableParams.filter({ name: branch.name });
					$scope.tableParams.reload();
				},
				function () {
					//add new branch, if prev. attempt failed..
					$scope.add();
				});
		}
	}

	$scope.checkNotNull = function (data, msg) {
		msg = msg || "Must be not null";
		if (!data) {
			return msg;
		}
	}

	$scope.remove = function (branch) {

		metroBranchesResource.remove({ id: branch.id_metrobranch }, function () {
			$scope.tableParams.reload();
		});
	}

	$scope.add = function () {
		$scope.inserted = {
			name: $scope.inserted ?
				$scope.inserted.name : null,
			id_metrobranch: null,
			color: $scope.inserted ?
				$scope.inserted.color : 0
		};

		$scope.tableParams.reload();
	}

	$scope.cancelEditing = function (rowform, branch) {
		rowform.$cancel();

		if (branch == $scope.inserted) {
			$scope.inserted = null;
			$scope.tableParams.reload();
		}
	}


	$scope.$on('$routeUpdate', function (scope, next, current) {
		if (!angular.equals(next.params, $scope.tableParams.url())) {
			$scope.tableParams.parameters(next.params, true);
			$scope.tableParams.reload();
		}
	});

	$scope.tableParams = new ngTableParams(
		{
			page: 1,            // show first page
			count: 10,           // count per page
			extended: true
		},
		{
			total: 0, // length of data
			getData: function ($defer, params) {
				var delay = Math.random() * 500;
				//эмитация загрузки разной продолжительности
				//TODO: remove $timeout
				$timeout(function () {
					metroBranchesResource.get(params.url(), function (data) {
						$location.search(params.url());
						if ($scope.inserted) {
							data.items.push($scope.inserted);
						}

						params.total(data.total);
						$defer.resolve(data.items.map(function (branch) {
							branch.color = decimalColorToHTMLcolor(branch.color);
							return branch;
						}));
					});
				}, delay);
			}
		});

});
