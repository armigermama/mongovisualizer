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

  getChart: function(req, res) {
    var dbID = req.params.id;
    res.redirect('dataview');
  }

};