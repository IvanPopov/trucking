/*
 * Сервис, отвечающий за операции с простыми каталогами
 * 
 */
'use strict';

app.factory('simpleCatalogs', function ($rootScope, $resource) {
    var catalogName = "naturalpersons";
    var naturalPersons = {};
    var apiUrl = null;

    return init();

    // Вся инициализация в этом методе
    function init() {
        apiUrl = $rootScope.CONFIG.apiUrl;
        return {
            getWorkTypes: getWorkTypes,
            getPhones: getPhones,
            getTools: getTools,
            getToolGroups: getToolGroups
        };
    }

    function getPhones(personId) {
        return $resource(apiUrl + "/api/naturalPersons/" + personId + "/phones/:phone", {},
        {
            'create': { method: 'post', url: apiUrl + "/api/naturalPersons/" + personId + "/phones/" }
        });
    }

    // Типы инструментов
    function getTools() {
        return $resource(apiUrl + "/api/catalogs/worktypes/:worktype", {
            worktype: '@worktype'
        },
        {
            'create': { method: 'post', url: apiUrl + "/api/catalogs/tools/" }
        });
    }

    // Группы типов инструментов
    function getToolGroups() {
        return $resource(apiUrl + "/api/catalogs/tools/groups/:group", {
            worktype: '@worktype'
        },
        {
            'create': { method: 'post', url: apiUrl + "/api/catalogs/tools/groups" }
        });
    }
   
    // Типы работ
    function getWorkTypes() {
        return $resource(apiUrl + "/api/catalogs/worktypes/:worktype", {
            worktype: '@worktype'
        },
        {
            'save': { method: 'PATCH' }
        });
    }

    // ToDo: /api/catalogs/worktypes/groups
});
