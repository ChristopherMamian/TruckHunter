
// var TruckSchema = require('../schemas/truck');
var Truck = require('../schemas/truck');
var User = require('../schemas/user');
// (trucks)
module.exports = function () {
  // var truck = require('../truck');

  // for(var number in trucks) {
  //   trucks[number] = truck(trucks[number]);
  // }

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

  functions.users = function (req, res) {
    // TruckSchema.find()
    User.find()
      .setOptions({sort: 'name'})
      .exec(function(err, users) {
      if (err) {
        res.status(500).json({status: 'failure'});
      } else {
        res.json(users);
      }
    });
  };


  functions.createUser = function (req, res) {
    var userName = "Chris M.";
    var location = "San Francisco";
    var truckID = "549c8dd631cb430000000002";

    // var record = new TruckSchema({
    var record = new User({
      name: userName,
      city: location
      // $push: {friends:[friendID]}
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

  functions.followTruck = function (req, res) {
    var userID = "549cbd761fe3510000000002";
    // var truckID = "549cbd751fe3510000000001";
    var truckID = "549cc12c5b31cd0000000003";


    User.update({_id: userID}, { $push: { trucksFollowing:[truckID]}}, {}, function(err) {
      if (err)
        res.send(err);
    });
  };

  functions.showFollowedTrucks = function (req, res) {
    var userID = "549cbd761fe3510000000002";

    User.findOne({ _id: userID}, function( err, user){
      if (err){
        console.log(err);
        res.status(404).json({status: err});
      }
      if (user) {
        Truck.find({ _id: {$in: user.trucksFollowing }}, function(err, trucks){
          res.json(trucks);
        });
      }
    });
  };

  functions.list = function (req, res) {
    res.json(trucks);
  };

  return functions;
};
