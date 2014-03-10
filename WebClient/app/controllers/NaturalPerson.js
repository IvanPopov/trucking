/*
 * Контроллер - физическое лицо 
 * 
 */
'use strict';

app.controller('NaturalPersonController', function ($scope, naturalPersonsService, $routeParams) {

    var personPhones = {};
    // Мне нравится идея складывать код инициализации в один метод таким образом
    init();

    function init() {
        var id = $routeParams.id_naturalperson;
        $scope.person = naturalPersonsService.getNaturalPersons().get({ id_naturalperson: id });
        $scope.personPhones = naturalPersonsService.getPhones(id).query();

        $scope.deletePhone = deletePhone;
        $scope.addPhone = addPhone;
    }

    function deletePhone(phoneStr) {
        var id = $routeParams.id_naturalperson;       
        naturalPersonsService.getPhones(id).delete({ phone: phoneStr },function() {
            $scope.personPhones = naturalPersonsService.getPhones(id).query();
        });
    }

    function addPhone(newPhoneStr) {
        var id = $routeParams.id_naturalperson;
        naturalPersonsService.getPhones(id).create({ phone: newPhoneStr }, function () {
            $scope.personPhones = naturalPersonsService.getPhones(id).query();
        });
    }
});
