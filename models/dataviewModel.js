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
var CollectionModel = require('./collectionModel.js');

var dataviewModel = module.exports = {


};
