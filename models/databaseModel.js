var mongoose = require('mongoose');

var databaseSchema = new mongoose.Schema({

  databaseNickName: String,
  databaseHost: String,
  databasePort: String,
  mongodbName: String

});

var DatabaseModel = module.exports = mongoose.model('database', databaseSchema);