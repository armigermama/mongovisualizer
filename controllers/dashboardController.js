var DatabaseModel = require('../models/databaseModel.js');
var CollectionModel = require('../models/collectionModel.js');


module.exports = {

  index: function(req, res) {
    res.render('dashboard');
  },

  addDb: function(req, res) {
    var databaseData = req.body;
    var database = new DatabaseModel(databaseData);

    database.save(function(err, doc) {
      console.log('doc', doc);
      res.send(doc);
    });

  },

  activeDb: function(req, res) {
    var dbID = req.params.id;
    DatabaseModel.findById(dbID, function(err, doc) {
      CollectionModel.activeDbCollections(doc.mongodbName, doc.databaseHost, doc.databasePort, function(doc){
        res.send( {doc: doc, dbID: dbID});
      });
      
      
    });

  }

};