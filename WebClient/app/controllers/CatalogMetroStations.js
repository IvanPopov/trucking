'use strict';

app.controller('CatalogMetroStationsController', function (
	$scope, $location, $http, $rootScope, $resource, $route,
	$routeParams, simpleCatalogs, $q, $filter, ngTableParams, $timeout) {

	var metroStationsResource = simpleCatalogs.getMetroStations();
	var metroBranchesResource = simpleCatalogs.getMetroBranches();
	var territorialSignsResource = simpleCatalogs.getTerritorialSigns();
	var metroStreetsResource = simpleCatalogs.getMetroStreets();
	var streetsResource = simpleCatalogs.getStreets();

	$scope.metroStations = metroStationsResource.query();
	$scope.metroBranches = metroBranchesResource.query();
	$scope.territorialSigns = territorialSignsResource.query();
	$scope.streets = streetsResource.query();

	//$scope.territorialSigns.push({ id_territorialsign: null, name: "Не задан", color: 0 });

	$q.all([
		$scope.metroStations.$promise,
		$scope.metroBranches.$promise,
		$scope.territorialSigns.$promise,
		$scope.streets.$promise]).then(function () {

			$scope.stylizeBranchSelect = function () {
				var $p = this.$editable.elem.parent().find("select:first");
				setTimeout(function () {

					$p.find("option").each(function (opt) {
						var $opt = $(this);
						var branch = $filter('filter')($scope.metroBranches, { name: $opt.html() })[0];
						$opt.attr('data-content', "<span class='label' style='background-color: " +
							decimalColorToHTMLcolor(branch.color) + ";'>" + branch.name + "</span>");
					});
					$p.selectpicker();
				}, 1);
			}

			$scope.stylizeSignSelect = function () {
				var $p = this.$editable.elem.parent().find("select:first");
				setTimeout(function () {
					var $fp = $p.find("option:first");
					if (!$fp.html().length) {
						$fp.removeAttr("selected");
						$fp.next().attr("selected", "true");
						$p.change();
					}
					//setTimeout(function () {
					$p.find("option").each(function (i) {
						var $opt = $(this);
						var name = $opt.html();
						var sign = null;
						var color = null;

						if (name.length > 0) {
							sign = $filter('filter')($scope.territorialSigns, { name: name })[0];
							color = decimalColorToHTMLcolor(sign.color);
						}

						$opt.attr('data-content', "<span class='label' style='min-width: 20px; background-color: " +
								(color ? color : "rgba(255,255,255,0.)") + ";'>&nbsp;</span> " + (name.length ? sign.name : '<span class="editable-empty">Не задано</span>') + "");
					});

					$p.selectpicker();
					//}, 0);

				}, 0);
			}

			$scope.getBranch = function (station) {
				return $filter('filter')($scope.metroBranches, { id_metrobranch: station.id_metrobranch })[0];
			}

			$scope.getSign = function (station) {
				return $filter('filter')($scope.territorialSigns, { id_territorialsign: station.id_territorialsign })[0];
			}

			$scope.getStreet = function (metroStreetElement) {
				return $filter('filter')($scope.streets, { id_street: metroStreetElement.id_street })[0];
			}
		});

	function cloneStation(station) {
		return {
			id_metro: station.id_metro,
			id_metrobranch: station.id_metrobranch,
			station: station.station,
			id_territorialsign: station.id_territorialsign
		};
	}

	//FIXME: before save element, resource dend 2 requiests for 
	// /api/metro/branches & /api/metro/stations....
	$scope.save = function (station, data) {
		for (var i in data) {
			station[i] = data[i];
		}

		if (!$scope.inserted) {
			//save existing resource.
			metroStationsResource.save({ id: station.id_metro }, cloneStation(station),
				function () {
					//success
				},
				function () {
					$scope.tableParams.reload();
				});
		}
		else {
			//creating new resource.

			metroStationsResource.create(cloneStation(station),
				function (station) {
					$scope.inserted = null;
					$scope.tableParams.filter({ station: station.station });
					$scope.tableParams.reload();
				},
				function () {
					//add new station, if prev. attempt failed..
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

	$scope.remove = function (station) {

		metroStationsResource.remove({ id: station.id_metro }, function () {
			$scope.tableParams.reload();
		});
	}

	$scope.add = function () {
		$scope.inserted = {
			station: $scope.inserted ?
				$scope.inserted.station : null,
			id_metro: null,
			//чтобы избежать колизиц в combobox'e, задавая значения о которых он не знает
			//то, что раньше выглядело как пустая строка, а сейчас в обнвленной версии 
			// как дубликат первого значения
			id_metrobranch: $scope.inserted ?
				$scope.inserted.id_metrobranch : $scope.metroBranches[0].id_metrobranch,
			id_territorialsign: $scope.inserted ? $scope.inserted.id_territorialsign : null,

			//extened
			streets: [],
			streetTags: []
		};

		$scope.tableParams.reload();
	}

	$scope.cancelEditing = function (rowform, station) {
		rowform.$cancel();

		if (station == $scope.inserted) {
			$scope.inserted = null;
			$scope.tableParams.reload();
		}

		//redraw SVG icon with correct height
		var $station = $("#station-" + station.id_metro);
		$station.find("svg:first").hide();
		$timeout(function () {
			station.height = $station.height() - 5;
			$station.find("svg:first").show();
		}, 1);
	}

	$scope.show = function (rowform, station) {
		rowform.$show();

		//redraw SVG icon with correct height
		$timeout(function () {
			station.height = $("#station-" + station.id_metro).height() - 5;
		}, 0);
	}


	$scope.$on('$routeUpdate', function (scope, next, current) {
		if (!angular.equals(next.params, $scope.tableParams.url())) {
			$scope.tableParams.parameters(next.params, true);
			$scope.tableParams.reload();
		}
	});

	$scope.loadStreetTags = function (query) {
		var deferred = $q.defer();

		$timeout(function () {
			var result = [];

			$scope.streets.forEach(function (street) {
				if (street.name.indexOf(query) != -1) {
					result.push(street);
				}
			});

			deferred.resolve(result);
		}, 10);

		return deferred.promise;
	}

	$scope.streetTagAdded = function (tag, station) {
		metroStreetsResource.create({ id_metro: station.id_metro }, { id_street: tag.id_street },
			function (data) {
				//TODO: change something...
			},
			function () {
				$scope.tableParams.reload();
			});
	}

	$scope.streetTagRemoved = function (tag, station) {
		console.log({ id_metro: station.id_metro, id_street: tag.id_street });
		metroStreetsResource.remove({ id_metro: station.id_metro, id_street: tag.id_street },
			function (data) {
				//TODO: change something...
			},
			function () {
				$scope.tableParams.reload();
			});
	}

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
						//console.log($route.current.params, $routeParams);
						$location.search(params.url());

						if ($scope.inserted) {
							data.items.push($scope.inserted);
						}

						params.total(data.total);

						$defer.resolve(data.items.map(function (station) {
							station.streets = station.streets || null;
							station.streetTags = station.streetTags || null;
							station.height = 40;

							if (station !== $scope.inserted) {
								metroStreetsResource.query({ id_metro: station.id_metro }, function (streets) {
									$timeout(function () {
										station.streets = streets;
										station.streetTags = [];
										streets.forEach(function (street) {
											station.streetTags.push($scope.getStreet(street));
										});
									}, delay);
								});
							}

							return station;
						}));
					});
				}, delay);
			}
		});

	$scope.tableParams.parameters($routeParams, true);

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

