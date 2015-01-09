
// var TruckSchema = require('../schemas/truck');
var jwt = require("jsonwebtoken");
var Truck = require('../schemas/truck');
var User = require('../schemas/user');

module.exports = function () {

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
    //Put array of truck objects here if you want to add more
    // for(var i = 0; i < trucks.length; i++){
    //   var trukName = trucks[i].Name;
    //   var twitHandle = trucks[i].Handle;
    //   var twitURL = trucks[i].TwitterAccount;
    //   var Type = trucks[i].Type;
    //   var img = trucks[i].Img;

        var record = new Truck({
          truckName: trukName,
          twitterHandle: twitHandle,
          twitterURL: twitURL,
          foodType: Type,
          profPic: img
        });

        record.save(function(err) {
          if (err) {
            console.log(err);
            res.status(500).json({status: err});
          }
        });
    };

  // };


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


  // functions.createUser = function (req, res) {
  //   var userName = "Chris M.";
  //   var location = "San Francisco";
  //   var truckID = "549c8dd631cb430000000002";

  //   // var record = new TruckSchema({
  //   var record = new User({
  //     name: userName,
  //     city: location
  //   });


  //   record.save(function(err) {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).json({status: err});
  //     }
  //   });
  // };

  functions.authenticate = function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
  };

  functions.signin = function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, 'shhhhh');


                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                });
            }
        }
    });
  };

  functions.meTrucks = function(req, res) {
    // console.log("meTrucks",req.token);
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
          console.log("error")
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        }

        if (user) {
          console.log("User");
          Truck.find({ _id: {$in: user.trucksFollowing }}, function(err, trucks){
            console.log(trucks)
            res.json(trucks);
          });
        }


    });
  };

  functions.me = function(req, res) {
    console.log("me", req.token);
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
  };

  functions.ensureAuthorized = function(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // res.send(403);
        res.status(403).end();
    }
};

  functions.updateTruck = function (req, res) {
//     handle: "BellyBurgers",
// address:"  1550 Howard Street, San Francisco, CA"
// },


for(var i =0; i < trucks.length; i++){
  var handle = trucks[i].handle;
  var address = trucks[i].address;

    Truck.update({ twitterHandle: handle },
    // TruckSchema.update({ _id: id },
      { $set: { currentAddress: address}},
        function (err) {
          if (err) {
            console.log(err);
            res.status(500).json({status: 'failure'});
          } else {
            res.json({status: 'success'});
          }
        }
    );

}



    // Truck.update({ _id: id },
    // // TruckSchema.update({ _id: id },
    //   { $set: { truckName: 'Nicks Tacos'}},
    //     function (err) {
    //       if (err) {
    //         console.log(err);
    //         res.status(500).json({status: 'failure'});
    //       } else {
    //         res.json({status: 'success'});
    //       }
    //     }
    // );

  };

  functions.deleteTruck = function (req, res) {

    var id = req.param('id');

    Truck.remove({_id: id}, function (err) {
      if (err) {
        console.log(err);
      }
    });
  };

  functions.followTruck = function (req, res) {
    var truckId = req.param('truckId');

    User.findOne({token: req.token}, function(err, user) {
        if (err) {
          console.log("error");
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        }

        if (user) {

          var userId = user._id;
          User.update({_id: userId}, { $push: {trucksFollowing: truckId}}, {}, function(err) {
            if (err)
              res.send(err);
          });
        }
    });
  };

  // functions.followTruck = function (req, res) {
  //   var userID = "54a43031201e3e7a887e1c37";
  //   // var truckID = "549cbd751fe3510000000001";
  //   var truckID = "549cc182cd77fc0000000001";


  //   User.update({_id: userID}, { $push: { trucksFollowing:[truckID]}}, {}, function(err) {
  //     if (err)
  //       res.send(err);
  //   });
  // };

  functions.showFollowedTrucks = function (req, res) {
    var userID = req.param('id');

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
