'use strict';

app.controller('CatalogMetroStationsController', function ($scope, $location, $http, $rootScope, $routeParams, simpleCatalogs, $q, $filter) {
	init();

	function init() {
		$scope.metroStations = simpleCatalogs.getMetroStations().query();
		$scope.metroBranches = simpleCatalogs.getMetroBranches().query();

		$q.all([$scope.metroStations.$promise, $scope.metroBranches.$promise]).then(function () {
			var map = {};

			$scope.metroBranches.forEach(function (branch) {
				map[branch.id_metrobranch] = branch;
			});

			//$scope.metroStations.forEach(function (station) {
			//	station.branch = map[station.id_metrobranch];
			//});

			$scope.stylizeBranchSelect = function () {
				var $p = this.$editable.elem.parent().find("select:first");
				
				setTimeout(function () {
					$.find("option").forEach(function (opt) {
						var $opt = $(opt);
						var branch = $filter('filter')($scope.metroBranches, { name: $(opt).html() })[0];
						$opt.attr('data-content', "<span class='label' style='background-color: " +
							decimalColorToHTMLcolor(branch.color) + ";'>" + branch.name + "</span>");
					});
					$p.selectpicker();
				}, 1);
			}

			$scope.updateField = function (field, data, id) {
				simpleCatalogs.getMetroStations().get({ id: id }, function (station) {
					station[field] = data;
					//TODO: $save???
					station.$save({ id: id });
					console.log(station.id_metrobranch, data);
				});
			}

			$scope.getBranch = function (station) {
				return $filter('filter')($scope.metroBranches, { id_metrobranch: station.id_metrobranch })[0];
			}
		});
	}
	
	$scope.checkNotNull = function (data, msg) {
		msg = msg || "Must be not null";
		if (!data) {
			return msg;
		}
	}

	$scope.removeStation = function (data) {
		console.log(data);
	}

	$scope.addStation = function () {
		$scope.inserted = {
			station: null,
			id_metro: null,
			id_metrobranch: null
		};

		$scope.metroStations.push(simpleCatalogs.getMetroStations().create($scope.inserted));
	}

	
});

function decimalColorToHTMLcolor(number) {
	//converts to a integer
	var intnumber = number - 0;

	// isolate the colors - really not necessary
	var red, green, blue;

	// needed since toString does not zero fill on left
	var template = "#000000";

	// in the MS Windows world RGB colors
	// are 0xBBGGRR because of the way Intel chips store bytes
	red = (intnumber & 0x0000ff) << 16;
	green = intnumber & 0x00ff00;
	blue = (intnumber & 0xff0000) >>> 16;

	// mask out each color and reverse the order
	intnumber = red | green | blue;

	// toString converts a number to a hexstring
	var HTMLcolor = intnumber.toString(16);

	//template adds # for standard HTML #RRGGBB
	HTMLcolor = template.substring(0, 7 - HTMLcolor.length) + HTMLcolor;

	return HTMLcolor;
}

app.filter('dec2HtmlColor', function () {
	return decimalColorToHTMLcolor;
});
