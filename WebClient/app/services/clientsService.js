//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('clientsService', function () {
	this.getClients = function () {
		return clients;
	};
	this.getDefaultClient = function () {
	    return clients[0];
	}
	this.getHoldings = function () {
	    return holdings;
	}
	this.getDefaultHolding = function () {
	    return holdings[0];
	}

    /*
	this.getClient = function (Id) {
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
    */

	var holdings = [
        {
            Name: "", Id: -1
        },
        {
            Name: "Mail.ru Group", Id: 0
        }   
	];

	var clients = [
        {
            Name: "Новый клиент", Id: -1, Holding: holdings[0]
        },
        {
        	Name: "Билайн", Id: 0, Holding: holdings[1]
        },
        {
            Name: "МТС", Id: 1, Holding: holdings[0]
        }
	];

});