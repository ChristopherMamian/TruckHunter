
var TruckSchema = require('../schemas/truck');

module.exports = function (trucks) {
	var truck = require('../truck');

	for(var number in trucks) {
		trucks[number] = truck(trucks[number]);
	}

	var functions = {};

	functions.trucks = function (req, res) {
		TruckSchema.find()
      .setOptions({sort: 'username'})
      .exec(function(err, users) {
      if (err) {
        res.status(500).json({status: 'failure'});
      } else {
        res.json(trucks);
      }
    });
		res.json(trucks);
	};

	functions.createTruck = function (req, res) {
		var truckName = "Sam's Truck";
		var currentAddress = "spain";
		var foodType = "mexican";
		var active = false;

		var record = new TaskSchema({
      truckName: truckName,
      currentAddress: currentAddress,
      foodType:foodType,
      active:active,
      authorName: req.session.passport.user
    });

    record.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).json({status: err});
      }
    });
	};

	functions.list = function (req, res) {
		res.json(trucks);
	};

	return functions;
};
