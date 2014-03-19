var DataviewModel = require('../models/dataviewModel.js');
var CollectionModel = require('../models/collectionModel.js');

module.exports = {

  index: function(req, res) {
    res.render('dataview');
  },

  getChart: function(req, res) {
    res.redirect('dataview');
  }

};