var mongoose = require('mongoose');

mongoose.connect('mongodb://truckhuntgroup:trucks!@ds051630.mongolab.com:51630/flightstutorial');

// mongoose.connect('mongodb://sam:Taylor11@ds029821.mongolab.com:29821/cors_auth');

module.exports = mongoose.connection;