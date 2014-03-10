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
        return {
            getNaturalPersons: getNaturalPersons,
            getPhones: getPhones
        };
    }

    function getNaturalPersons() {
        return $resource(apiUrl + "/api/" + catalogName + "/:id_naturalperson", {
            id_naturalperson: '@id_naturalperson'
        },
        { 'save': { method: 'PATCH' } });
    }

    function getPhones(personId) {
        return $resource(apiUrl + "/api/naturalPersons/" + personId + "/phones/:phone", {},
        {
            'create': { method: 'post', url: apiUrl + "/api/naturalPersons/" + personId + "/phones/" }
        });
    }
});
