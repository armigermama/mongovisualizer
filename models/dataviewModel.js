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

var dataviewModel = module.exports = {

	uniqueKeys: function(collectionName, cb) {
		var keys = [];

    Db.connect('mongodb://heroku:Batting1@oceanic.mongohq.com:10050/app23167815', function(err, db) {
      assert.equal(null, err);
      async.waterfall([

        function(callback) {
          var collection = db.collection(collectionName);
          collection.find().toArray(function(err, collectionArray) {
            console.log('collectionArray: ', collectionArray);
            if (err) {console.log(err);}
            callback(db, collectionArray);
          });
        },

        function(collectionArray, callback) {
          for (var i=0; i<collectionArray.length; i++) {
            for (var key in collectionArray[i]) {
              if (keys.indexOf(key) === -1) {
                console.log('key inside loop: ', key);
                keys.push(key);
              }
            }
          }
          console.log('keys: ', keys);
          callback(db, keys);
        },
        function(keys, callback) {
          callback(keys);
        }
        ], function(err, result) {
          console.log('waterfall async result: ', result);
          cb(result);
        }
      );
    db.close();
    });
  },

 //    CollectionModel.openDb('app23167815', 'oceanic.mongohq.com', '10050', 'heroku', 'Batting1', 
 //      function(err, db) {
 //        var theCollection = db.collection(collectionName);
 //        console.log('theCollection: ', theCollection);
 //        for (var i=0; i<theCollection.length; i++) {
 //          for (var key in theCollection[i]) {
 //            if (keys.indexOf(key) === -1) {
 //              keys.push(key);
 //            }
 //          }
 //        }
 //      db.close();
 //    });	
 //  console.log('uniqueKeys: ', keys);
 //  callback(keys);
	// },

  aggFieldArray: function(aggFieldKey, callback) {

  }

};
