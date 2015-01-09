/*--------Original/Nick combo---------------*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var truckSchema = Schema({
  truckName: String,
  twitterHandle: String,
  twitterURL: String,
  currentAddress: String,
  profPic: String,
  foodType: String,
  active: Boolean
});

module.exports  = mongoose.model('Truck', truckSchema);

/*
There are many ways of doing the same thing
in javascript and this is one of them. There are three
setups defined below that would all potentially work
with a few tweaks.
*/
/*--------Original setup-------------*/
// var mongoose = require('mongoose');

// var Truck = new mongoose.Schema({
//   truckName: String,
//   currentAddress: String,
//   foodType: String,
//   active: Boolean
// });

// module.exports = mongoose.model('Truck', Truck);

/* This exports the 'Truck' model, defined above,
so that it can be called in by the index.js file
inside the routes folder as follows:

var TruckSchema = require('../schemas/truck'); */


/*--------------------------------------*/
//Nick's example
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema

// var trucksSchema = new Schema ({
//  truckName: String,
//  currentAddress: String,
//  foodType: String,
//  active: Boolean,
// });

// mongoose.model('trucks', trucksSchema);

/*
Nick --- we need module.exports here as you
can see on line 37. Otherwise the routes > index.js
on lines 2 or 3 cannot see this new mongoose schema
we setup here
*/
