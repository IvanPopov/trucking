'use strict';

app.controller('CatalogMetroStationsController', function ($scope, $location, $http, $rootScope,
		$routeParams, simpleCatalogs, $q, $filter, ngTableParams) {
	$scope.metroStations = simpleCatalogs.getMetroStations().query();
	$scope.metroBranches = simpleCatalogs.getMetroBranches().query();

	$q.all([$scope.metroStations.$promise, $scope.metroBranches.$promise]).then(function () {
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

		$scope.getBranch = function (station) {
			return $filter('filter')($scope.metroBranches, { id_metrobranch: station.id_metrobranch })[0];
		}
	});

	//FIXME: before save element, resource dend 2 requiests for 
	// /api/metro/branches & /api/metro/stations....
	$scope.saveStation = function (station, data) {
		for (var i in data) {
			station[i] = data[i];
		}

		if (angular.isDefined(station.$save)) {
			//save existing resource.
			station.$save({ id: station.id_metro });
		}
		else {
			//creating new resource.
			simpleCatalogs.getMetroStations().create(station).$promise.then(function (station) {
				$scope.metroStations[$scope.metroStations.length - 1] = station;
			}, function () {
				$scope.metroStations.pop();
			});
		}
	}

	$scope.checkNotNull = function (data, msg) {
		msg = msg || "Must be not null";
		if (!data) {
			return msg;
		}
	}

	$scope.removeStation = function (station) {
		station.$remove({ id: station.id_metro }).then(function () {
			//remove if success
			$scope.metroStations.splice($scope.metroStations.indexOf(station), 1);
		});
	}

	$scope.addStation = function () {
		$scope.inserted = {
			station: null,
			id_metro: null,
			//чтобы избежать колизиц в combobox'e, задавая значения о которых он не знает
			//то, что раньше выглядело как пустая строка, а сейчас в обнвленной версии 
			// как дубликат первого значения
			id_metrobranch: $scope.metroBranches[0].id_metrobranch
		};

		$scope.metroStations.push($scope.inserted);
	}

	$scope.tableParams = new ngTableParams(
		{
			page: 1,            // show first page
			count: 3,           // count per page
			sorting: {
				name: 'asc'     // initial sorting
			}
		},
		{
			total: 0, // length of data
			getData: function ($defer, params) {
				console.log(">>>");
				$scope.metroStations.$promise.then(function (data) {
					params.total(data.length);
					var orderedData = params.sorting() ?
						$filter('orderBy')(data, params.orderBy()) :
						data;
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				});
			}
		});
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
