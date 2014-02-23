//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('usersService', function () {
	this.getUsers = function () {
		return users;
	};
	this.getUser = function (Id) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].id === Id) {
			    return users[i];
			}
		}
		return null;
	};

	// ID пользователя, который сейчас залогинен в систему
	this.getCurrentUserId = function () {
		return 1;
	}

	var users = [
        {
        	id: 1, firstName: 'Руслан', lastName: 'Талипов', lastLastName: '', status: 'Admin'
        },
        {
            id: 2, firstName: 'Александр', lastName: 'Околедов', lastLastName: 'Викторович', status: 'Admin'
        },
        {
            id: 3, firstName: 'Иван', lastName: 'Попов', lastLastName: '', status: 'Admin'
        }
	];

});