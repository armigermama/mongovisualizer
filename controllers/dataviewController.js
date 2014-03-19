var DataviewModel = require('../models/dataviewModel.js');
var CollectionModel = require('../models/collectionModel.js');

module.exports = {

  index: function(req, res) {
    var dbID = req.params.id;
    console.log('dbID: ', dbID);
    res.render('dataview');
  },

  getChart: function(req, res) {
    res.redirect('dataview');
  }

};