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

  activeDb: function(dbname, dbhost, dbport, callback) {

    var db = new Db(dbname, new Server(dbhost, dbport), {w: 0});
      // Establish connection to db
    db.open(function(err, db) {
      assert.equal(null, err);

      db.collectionNames(function(err, names) {
        assert.ok(names.length > 0);
        var collectionNameCount = [];
        console.log(names);
        
        for (var i=1; i<names.length; i++) {
          var collectionName = names[i].name.slice(dbname.length+1);
          var collection = db.collection(collectionName);
          collection.count(function(err, count) {
            assert.equal(null, err);
            console.log('count: ', count);

            // collectionNameCount.push({
            // collectionName: collectionCount
            // })
          });

        } /* end of for collection names loop */
        // console.log('collectionNameCount: ', collectionNameCount);

        // callback(collectionNameCount);

        db.close();
      });
     
    }) /** end of db.open function **/
  } /** end of activeDb method **/

}

