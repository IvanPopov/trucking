'use strict';

app.controller('LoginCtrl', function ($scope, Auth) {
    $scope.username = "admin@example.org";
    $scope.password = "admin";
    $scope.isBadLoginPassword = false;

    $scope.login = function () {
        Auth.RequestTokenAsync($scope.username, $scope.password
        ).then(
            function () {
                Auth.redirectToHome();
            },
            function (errorText) {
                // Включаем сообщение об ошибке
                if (errorText == 'invalid_grant') {
                    console.log('Invalid username & password');
                    $scope.isBadLoginPassword = true;
                } else {
                    $scope.isOtherError = true;
                    $scope.errorText = errorText;
                }
            }
        );

    };
});
