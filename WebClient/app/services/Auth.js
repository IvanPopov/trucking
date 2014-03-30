'use strict';

app.factory('Auth', function ($cookieStore, $http, $location, $rootScope, $q) {

	return init();

	// Public API here
	function init() {
		return {
			authenticate: authenticate,
			RequestTokenAsync: requestTokenAsync,
			logout: logout,
			redirectToLogin: redirectToLogin,
			redirectToHome: redirectToHome
		};
	};

    function redirectToLogin() {
        return $location.path('/login');
    };
    function redirectToHome() {
        return $location.path('/');
    };
	function logout() {
		$cookieStore.remove('auth');
		redirectToLogin();
	};
	function getAuthToken() {
        if( !$cookieStore.get('auth') ) {
            return null;
        }
        return $cookieStore.get('auth').access_token;
    };

    function authenticate(accessToken) {
    	var deferred = $q.defer();

        if (typeof (accessToken) == 'undefined') {
            accessToken = getAuthToken();
        }
        if (accessToken == null) {
        	redirectToLogin();
        	deferred.reject();
        	return deferred.promise;
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
            	deferred.resolve();
            })
            .error(function(data, status) {
                if (status == 0) {
                    console.log('Could not reach API');
                }
                redirectToLogin();
                deferred.reject();
            });
        return deferred.promise;
    }

    function requestTokenAsync(username, password) {
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
	};
});
