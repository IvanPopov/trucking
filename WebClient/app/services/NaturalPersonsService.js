/*
 * Сервис, отвечающий за все операции с Физическими лицами, а так же за
 * редактирование конкретного лица
 * 
 */
'use strict';

app.factory('naturalPersonsService', function ($http, $rootScope, $resource) {
    var catalogName = "naturalpersons";
    var naturalPersons = {};
    var apiUrl = null;

    return init();

    // Вся инициализация в этом методе
    function init() {
        apiUrl = $rootScope.CONFIG.apiUrl;
        return { getNaturalPersons: getNaturalPersons };
    }

    function getNaturalPersons() {
        return $http({
            url: apiUrl + "/api/catalogs/" + catalogName,
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    /*
    function getNaturalPersonsResource() {
        return $resource(apiUrl + "/api/catalogs/" + catalogName + ":id", {}, {
            query: {
                method: 'GET',
                params: { id: 'phones' },
                isArray: true
            }
        });
    }

    function getNaturalPerson(id) {
        return $resource(apiUrl + "/api/catalogs/" + catalogName + ":id", {}, {
            query: {
                method: 'GET',
                params: { phoneId: 'phones' },
                isArray: true
            }
        });
    }*/
});