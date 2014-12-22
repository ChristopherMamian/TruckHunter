
var TruckSchema = require('../schemas/truck');

module.exports = function (trucks) {
	var truck = require('../truck');

	for(var number in trucks) {
		trucks[number] = truck(trucks[number]);
	}

	var functions = {};

	functions.truck = function(req, res){
		var number = req.param('number');

		if (typeof trucks[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			res.json(trucks[number].getInformation());
		}
	};

	functions.list = function (req, res) {
		res.json(trucks);
	};

	return functions;
};
