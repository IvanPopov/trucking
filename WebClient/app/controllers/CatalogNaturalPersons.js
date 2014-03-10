/*
* Справочник "Типы инструментов"
* 
* 
*/
'use strict';

app.controller('CatalogNaturalPersonsController', function ($scope, naturalPersonsService) {

    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
        $scope.naturalPersons = naturalPersonsService.getNaturalPersons().query();
    }


});