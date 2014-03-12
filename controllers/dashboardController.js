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

  },

  editDb: function(req, res) {

  },

  removeDb: function(req, res) {

  }



};