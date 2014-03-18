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


// function to open and return an object of opened mongodb by given dbname, host and port
var openDb = function(dbname, dbhost, dbport, callback) {
  var db = new Db(dbname, new Server(dbhost, dbport), {w: 0});
  db.open(function(err, db) {
    assert.equal(null, err);
    callback(null, db);
  })
};


var collectionModel = module.exports = {

  // helper function to create an array of objects containing collection names and
  // # of documents in each collection in the activated mongoDB by active button click event
  openDb: openDb,

  activeDb: function(dbname, dbhost, dbport, cb) {
    
    async.waterfall([

      function(callback) {
        openDb(dbname, dbhost, dbport, callback);
      },

      function(db, callback) {
        db.collectionNames(function(err, names) {
          assert.equal(null, err);
          assert.ok(names.length > 0);
          var names = names.map(function(n) {
            return n.name.slice(dbname.length+1);
          })
          console.log('names array: ', names);
          callback(null, db, names);
        })
      },

      function(db, names, callback) {
        var nameCountFunctions = names.slice(1).map(function(name) {
          return function(cb) {
            db.collection(name).count(function(err, count) {
              assert.equal(null, err);
              var obj = {};
              obj[name] = count;
              cb(null, obj);
              // obj[stats.ns.slice(dbname.length+1)] = stats.count;
              console.log('nameCount: ', obj);
            });
          };
        });
        async.parallel(nameCountFunctions, function(err, results) {
          callback(null, db, results);
        });
      },

      function(db, nameCount, callback) {
        db.close();
        callback(null, nameCount);
      }
    ], function(err, result) {
      console.log('aync result: ', result);
      cb(result);
    });
  }
};
