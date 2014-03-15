var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var collectionModel = module.exports = {

  activeDb: function(name, host, port, callback) {

    var db = new Db(name, new Server(host, port), {w: 0});
      // Establish connection to db
    db.open(function(err, db) {
      assert.equal(null, err);

      db.stats(function(err, stats) {
        assert.equal(null, err);
        assert.ok(stats != null);

        callback(stats);

        db.close();
      });
    })
  }

}

