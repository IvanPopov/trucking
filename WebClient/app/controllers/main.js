'use strict';

app.controller('MainCtrl', function ($scope, $cookieStore, $http, $rootScope) {
    $http({
        url: $rootScope.CONFIG.apiUrl + "/api/catalogs",
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).success(function(data, status, headers, config) {
        $scope.resultObject = data;
    });
});
