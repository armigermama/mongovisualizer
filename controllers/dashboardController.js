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
    console.log('dbID: ', dbID);

    DatabaseModel.findById(dbID, function(err, doc) {
      console.log(doc.mongodbName, doc.databaseHost, doc.databasePort);
      CollectionModel.activeDb(doc.mongodbName, doc.databaseHost, doc.databasePort, function(data){
        console.log(data);
      });
      
      
    });

  },

  editDb: function(req, res) {


  },

  removeDb: function(req, res) {
    var dbID = req.params.id;

    DatabaseModel.remove( {_id: dbID} , function(err, doc) {
      res.doc(err);
    });

  }



};