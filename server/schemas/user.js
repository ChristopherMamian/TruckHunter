var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
  email: String,
  password: String,
  token: String,
  trucksFollowing: [{ type: Schema.Types.ObjectId, ref: 'Truck'}]
});

module.exports = mongoose.model('User', personSchema);
