/*
* Справочник "Типы инструментов"
* 
* 
*/
'use strict';

app.controller('CatalogNaturalPersonsController', function ($scope, naturalPersonsService, $rootScope, $resource) {

    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
        $scope.naturalPersons = naturalPersonsService.getNaturalPersons().success(function(data, status) {
            $scope.naturalPersons = data;
        });
    }


});