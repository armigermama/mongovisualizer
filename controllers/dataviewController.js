var DataviewModel = require('../models/dataviewModel.js');
var CollectionModel = require('../models/collectionModel.js');
var DatabaseModel = require('../models/databaseModel.js');

module.exports = {

  index: function(req, res) {
    var dbID = req.params.id;
    DatabaseModel.findById(dbID, function(err, doc) {
      console.log(doc);
      res.render('dataview', {
        collectionNames: doc.collectionNames
      });
    })
    
  },

  getCollectionData: function(req, res) {
    var collectionName = Object.keys(req.body)[0];
    DataviewModel.uniqueKeys(collectionName, function(err, keys) {
      console.log('keys back in Controller', keys);
      res.send(keys);
    });
    
    // DataviewModel.uniqueKeys(req.body, function(err, doc) {
    //   res.send(doc);
    // });

  },

  getChart: function(req, res) {
    var dbID = req.params.id;
    res.redirect('dataview');
  }

};