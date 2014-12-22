var mongoose = require('mongoose');

module.exports = mongoose.model('Truck', {
	truckName: String,
	currentAddress: String,
	foodType: String,
	active: Boolean,
});
