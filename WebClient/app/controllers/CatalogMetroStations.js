'use strict';

app.controller('CatalogMetroStationsController', function (
	$scope, $location, $http, $rootScope, $resource,
	$routeParams, simpleCatalogs, $q, $filter, ngTableParams, $timeout) {
	
	var metroStationsResource = simpleCatalogs.getMetroStations();
	var metroBranchesResource = simpleCatalogs.getMetroBranches();
	
	$scope.metroStations = metroStationsResource.query();
	$scope.metroBranches = metroBranchesResource.query();

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

		if (!$scope.inserted) {
			//save existing resource.
			metroStationsResource.save({ id: station.id_metro }, station,
				function () {
					//success
				},
				function () {
					$scope.tableParams.reload();
				});
		}
		else {
			//creating new resource.

			metroStationsResource.create(station,
				function (station) {
					$scope.inserted = null;
					$scope.tableParams.filter({ station: station.station });
					$scope.tableParams.reload();
				},
				function () {
					//add new station, if prev. attempt failed..
					$scope.addStation();
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

		metroStationsResource.remove({ id: station.id_metro }, function () {
			$scope.tableParams.reload();
		});
	}

	$scope.addStation = function () {
		$scope.inserted = {
			station: $scope.inserted ?
				$scope.inserted.station : null,
			id_metro: null,
			//чтобы избежать колизиц в combobox'e, задавая значения о которых он не знает
			//то, что раньше выглядело как пустая строка, а сейчас в обнвленной версии 
			// как дубликат первого значения
			id_metrobranch: $scope.inserted ?
				$scope.inserted.id_metrobranch : $scope.metroBranches[0].id_metrobranch
		};

		$scope.tableParams.reload();
	}

	$scope.cancelEditing = function (rowform, station) {
		rowform.$cancel();

		if (station == $scope.inserted) {
			$scope.inserted = null;
			$scope.tableParams.reload();
		}
	}


	$scope.$on('$routeUpdate', function (scope, next, current) {
		if (!angular.equals(next.params, $scope.tableParams.url())) {
			$scope.tableParams.parameters(next.params);
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
					metroStationsResource.get(params.url(), function (data) {
						$location.search(params.url());
						if ($scope.inserted) {
							data.items.push($scope.inserted);
						}

						params.total(data.total);
						$defer.resolve(data.items);
					});
				}, delay);
			}
		});

	window.tp = $scope.tableParams;

}).filter('dec2HtmlColor', function () {
	return decimalColorToHTMLcolor;
}).filter('highlightFilter', function ($sce) {
	return function (input, q) {
		if (!input || !q) {
			return $sce.trustAsHtml(input);
		}

		return $sce.trustAsHtml(input.replace(new RegExp(q, "gi"), function (s) {
			return "<span style='background: yellow;'>" + s + "</span>";
		}));
	}
}).directive('loadingContainer', function ($timeout) {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			var loadingLayer = angular.element('<div class="loading"></div>');
			element.append(loadingLayer);
			element.addClass('loading-container');
			var timeout = null;
			scope.$watch(attrs.loadingContainer, function (value) {
				//clear timeout if exists
				$timeout.cancel(timeout);

				// если нужно показать что идент загрузка, то подождем 100мс, 
				// чтобы избежать мерцания на быстрые
				// ответы сервера
				if (value) {
					timeout = $timeout(function () {
						loadingLayer.toggleClass('ng-hide', false);
					}, 100);
				}
				else {
					loadingLayer.toggleClass('ng-hide', true);
				}
			});
		}
	};
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

