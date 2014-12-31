var mongoose = require('mongoose');

mongoose.connect('mongodb://truckhuntgroup:trucks!@ds051630.mongolab.com:51630/flightstutorial');

module.exports = mongoose.connection;