var mongoose = require('mongoose');


module.exports = mongoose.model('Truck', {
	truckName: String,
	currentAddress: String,
	foodType: String,
	active: Boolean,
});



// added by nick => not sure what the module.exports is for 
// code below should work if above does not 


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema 

// var trucksSchema = new Schema ({
// 	truckName: String,
// 	currentAddress: String,
// 	foodType: String,
// 	active: Boolean,
// });

// mongoose.model('trucks', trucksSchema);