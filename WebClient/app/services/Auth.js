'use strict';

app.factory('Auth', function ($cookieStore, $http, $location, $rootScope, $q) {
    // Service logic
    // ...

    var redirectToLogin = function () {
        return $location.path('/login');
    };
    var redirectToHome = function () {
        return $location.path('/');
    };

    var getAuthToken = function () {
        return $cookieStore.get('auth').access_token;
    };

    var authenticate = function(accessToken) {
        if (typeof (accessToken) == 'undefined') {
            accessToken = getAuthToken();
        }

        // Let's attempt an API call
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        var config = {
            'method': 'GET',
            'url': $rootScope.CONFIG.apiUrl + '/api/userinfo'
        };

        $http(config) // Get user data
            .success(function(data) {
                $rootScope.user = data;
            })
            .error(function(data, status) {
                if (status == 0) {
                    console.log('Could not reach API');
                }
                redirectToLogin();
            });
    };

    // Public API here
    return {
        authenticate: function() {
            return authenticate();
        },
        RequestTokenAsync: function(username, password) {
            var deferred = $q.defer();
            var postData = {
                client_id: $rootScope.CONFIG.clientId,
                client_secret: $rootScope.CONFIG.clientSecret,
                grant_type: 'password',
                username: username,
                password: password
            };
            $http({
                url: $rootScope.CONFIG.apiUrl + "/oauth/token",
                method: "POST",
                data: $.param(postData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': null
                }
            }).success(function(data, status, headers, config) {
                console.log('Authentication Successful!');
                $cookieStore.put('auth', data);

                authenticate(data.access_token);
                deferred.resolve(null);
            }).error(function(data, status) {
                if (status != 0 && data.error == 'invalid_grant') {
                    deferred.reject("invalid_grant");
                } else {
                    deferred.reject("Eror, http code: " + status);
                }
            });
            return deferred.promise;
        },
        logout: function() {
            $cookieStore.remove('auth');
        },
        redirectToLogin: function() {
            return redirectToLogin();
        },
        redirectToHome: function() {
            return redirectToHome();
        }
    };
});
