var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
  name: String,
  city: String,
  trucksFollowing: [{ type: Schema.Types.ObjectId, ref: 'Truck'}]
});

module.exports = mongoose.model('Person', personSchema);
