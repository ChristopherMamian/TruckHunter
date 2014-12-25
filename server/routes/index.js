
// var TruckSchema = require('../schemas/truck');
var Truck = require('../schemas/truck');


module.exports = function (trucks) {
  var truck = require('../truck');

  for(var number in trucks) {
    trucks[number] = truck(trucks[number]);
  }

  var functions = {};

  //corresponds to route in server.js
  // ---> /trucks
  functions.trucks = function (req, res) {
    // TruckSchema.find()
    Truck.find()
      .setOptions({sort: 'truckName'})
      .exec(function(err, trucks) {
      if (err) {
        res.status(500).json({status: 'failure'});
      } else {
        res.json(trucks);
      }
    });
  };

  //corresponds to route in server.js
  // ---> /trucks/new
  functions.createTruck = function (req, res) {
    var truckName = "Sam's Truck";
    var currentAddress = "spain";
    var foodType = "mexican";
    var active = false;

    // var record = new TruckSchema({
    var record = new Truck({
      truckName: truckName,
      currentAddress: currentAddress,
      foodType:foodType,
      active:active
    });

    record.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).json({status: err});
      }
    });
  };


  functions.updateTruck = function (req, res) {

    var id = req.param('id');

    Truck.update({ _id: id },
    // TruckSchema.update({ _id: id },
      { $set: { truckName: 'Nicks Tacos'}},
        function (err) {
          if (err) {
            console.log(err);
            res.status(500).json({status: 'failure'});
          } else {
            res.json({status: 'success'});
          }
        }
    );

  };

  functions.deleteTruck = function (req, res) {

  	var id = req.param('id');

  	Truck.remove({_id: id}, function (err) {
  		if (err) {
  			console.log(err);
  		}
  	});
  }

  functions.list = function (req, res) {
    res.json(trucks);
  };

  return functions;
};
