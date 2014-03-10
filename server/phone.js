
var list = [
	"+79261234567",
	"89261234567",
	"79261234567",
	"+7 926 123 45 67",
	"8(926)123-45-67",
	"123-45-67",
	"9261234567",
	"79261234567",
	"(495)1234567",
	"(495) 123 45 67",
	"89261234567",
	"8-926-123-45-67",
	"8 927 1234 234",
	"8 927 12 12 888",
	"8 927 12 555 12",
	"8 927 123 8 123"
];

function tel(tel) {
	if (!tel) { return ''; }
	
	var tel = tel.toString().trim();
	var value = tel.replace(/^\+/, '').replace(/[\-\(\)\s]/g, '');

	if (value.match(/[^0-9]+/)) {
		return "invalid: " + tel;
	}

	var country, city, number;

	switch (value.length) {
		case 10: // +1PPP####### -> C (PPP) ###-####
			country = 1;
			city = value.slice(0, 3);
			number = value.slice(3);
			break;

		case 11: // +CPPP####### -> CCC (PP) ###-####
			country = value[0];
			city = value.slice(1, 4);
			number = value.slice(4);
			break;

		case 12: // +CCCPP####### -> CCC (PP) ###-####
			country = value.slice(0, 3);
			city = value.slice(3, 5);
			number = value.slice(5);
			break;

		default:
			return "invalid: " + tel;
	}

	if (country == 1) {
		country = "";
	}

	number = number.slice(0, 3) + '-' + number.slice(3);

	return ((tel[0] === '+'? '+': '') + country + " (" + city + ") " + number).trim();
};

list.forEach(function (phone) {
	var pattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)[\d\- ]{7,10}$/;
	if (!phone.match(pattern)) return console.log("invalid number > " + phone);

	console.log(tel(phone));
});
