app.controller('CatalogStreetsController', function (
	$scope, $location, $http, $rootScope, $resource,
	$routeParams, simpleCatalogs, $q, $filter, ngTableParams, $timeout, $compile) {

	var streetsResource = simpleCatalogs.getStreets();
	var streetMetroStationsResource = simpleCatalogs.getStreetMetroStations();
	var metroStationsResource = simpleCatalogs.getMetroStations();

	$scope.streets = streetsResource.query();
	$scope.metroStations = metroStationsResource.query();

	$q.all([
		$scope.streets.$promise,
		$scope.metroStations.$promise
	]).then(function () {
			$scope.getStation = function (streetMetroStationElement) {
				return $filter('filter')($scope.metroStations, { id_metro: streetMetroStationElement.id_metro })[0];
			}
		});

	function cloneStreet(street) {
		return {
			id_street: street.id_street,
			name: street.name,
			comment: street.comment || null
		};
	}

	$scope.save = function (street, data) {
		for (var i in data) {
			street[i] = data[i];
		}

		if (!$scope.inserted) {
			//save existing resource.
			streetsResource.save({ id: street.id_street }, cloneStreet(street),
				function () {
					//success
				},
				function () {
					$scope.tableParams.reload();
				});
		}
		else {
			//creating new resource.

			streetsResource.create(cloneStreet(street),
				function (street) {
					$scope.inserted = null;
					$scope.tableParams.filter({ name: street.name });
					$scope.tableParams.reload();
				},
				function () {
					//add new street, if prev. attempt failed..
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

	$scope.remove = function (street) {

		streetsResource.remove({ id: street.id_street }, function () {
			$scope.tableParams.reload();
		});
	}

	$scope.add = function () {
		$scope.inserted = {
			name: $scope.inserted ?
				$scope.inserted.name : null,
			id_street: null,
			comment:  $scope.inserted ?
				$scope.inserted.comment : null,

			//extened
			stations: [],
			stationTags: []
		};

		$scope.tableParams.reload();
	}


	$scope.cancelEditing = function (rowform, street) {
		rowform.$cancel();

		if (street == $scope.inserted) {
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

	$scope.loadStationTags = function (query) {
		var deferred = $q.defer();

		$timeout(function () {
			var result = [];

			$scope.metroStations.forEach(function (station) {
				if (station.station.indexOf(query) != -1) {
					result.push(station);
				}
			});

			deferred.resolve(result);
		}, 10);

		return deferred.promise;
	}

	$scope.stationTagAdded = function (tag, street) {
		streetMetroStationsResource.create({ id_street: street.id_street }, { id_metro: tag.id_metro },
			function (data) {
				//TODO: change something...
			},
			function () {
				$scope.tableParams.reload();
			});
	}

	$scope.stationTagRemoved = function (tag, street) {
		streetMetroStationsResource.remove({ id_street: street.id_street, id_metro: tag.id_metro },
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
					streetsResource.get(params.url(), function (data) {
						$location.search(params.url());

						if ($scope.inserted) {
							data.items.push($scope.inserted);
						}

						params.total(data.total);
						$defer.resolve(data.items.map(function (street) {
							street.stations = street.stations || null;
							street.stationTags = street.stationTags || null;

							if (street !== $scope.inserted) {
								streetMetroStationsResource.query({ id_street: street.id_street }, function (stations) {
									$timeout(function () {
										street.stations = stations;
										street.stationTags = [];
										stations.forEach(function (station) {
											street.stationTags.push($scope.getStation(station));
										});
									}, delay);
								});
							}

							return street;
						}));
					});
				}, delay);
			}
		});

	$scope.tableParams.parameters($routeParams, true);

});