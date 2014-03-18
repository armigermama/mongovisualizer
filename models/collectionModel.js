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
var async = require('async');
// **************
// establish namespace and  some properties to help organize the code


var collectionModel = module.exports = {

  // helper function to create an array of objects containing collection names and
  // # of documents in each collection in the activated mongoDB by active button click event
  activeDb: function(dbname, dbhost, dbport, cb) {
    var db = new Db(dbname, new Server(dbhost, dbport), {w: 0});
    
    async.waterfall([

      function(callback) {
        db.open(function(err, db) {
          assert.equal(null, err);
          callback(null, db);
        });
      },

      function(db, callback) {
        db.collectionNames(function(err, names) {
          assert.ok(names.length > 0);
          console.log("names: ", names);
          callback(null, names);
        })
      },

      function(names, callback) {
        nameCount =[];
        async.whilst(
          function() { return nameCount.length < names.length },
          function(cb) {
            for (var i=1; i<names.length; i++) {
              var collectionName = names[i].name.slice(dbname.length+1);
              console.log('outside collectionName: ', collectionName);
              var collection = db.collection(collectionName);
              collection.count(function(err, count) {
                console.log('inside collectionName: ', collectionName);
                var obj ={};
                obj[collectionName] = count;
                nameCount.push(obj);
                console.log('obj: ', obj);
                if (nameCount.length === names.length - 1) callback();
              });
            }
          },
          function(err) {
            console.log('whillst async nameCount: ', nameCount);
          }
        );
        callback(null, nameCount);
      },

      function(nameCount, callback) {
        db.close();
        callback(null, nameCount);
      }
    ], function(err, result) {
      console.log('aync result: ', result);
    });
  }
};
