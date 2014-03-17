    var Db = require('mongodb').Db,
        MongoClient = require('mongodb').MongoClient,
        format = require('util').format,
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

      // helper function to create an array of objects containing collection names and
      // # of documents in each collection in the activated mongoDB by active button click event
      activeDb: function(dbname, dbhost, dbport, callback) {

        var db = new Db(dbname, new Server(dbhost, dbport), {w: 0});
          // Establish connection to db
        db.open(function(err, db) {
          assert.equal(null, err);

          // to get all the names of collections in the given mongoDB,
          // this function will return the collection names in an array
          db.collectionNames(function(err, names) {
            assert.ok(names.length > 0);

            // define the local variable for both collection names and # of documents to be pushed to
            // this will be sent back to the client thru callback
            var collectionNameCount = [];
            console.log(names);
            
            // to loop thru the length of collection name array ([0] is skipped as it is used for db.index)
            // and get the count of documents in each collection, push both name and count to collectionNameCount
            for (var i=1; i<names.length; i++) {
              var collectionName = names[i].name.slice(dbname.length+1);
              var collection = db.collection(collectionName);

              collection.count(function(err, count) {
                // assert.equal(null, err);
                console.log(err);
                console.log('count: ', count);

                collectionNameCount.push({
                collectionName: count
                });
              });

            } /* end of for collection names loop */

            callback(collectionNameCount);

            db.close();
          });
         
        }); /** end of db.open function **/
      } /** end of activeDb method **/

    };
