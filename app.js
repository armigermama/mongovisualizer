
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var DashboardController = require('./controllers/dashboardController.js');
var DataviewController = require('./controllers/dataviewController.js');

// connect to mongoose
mongoose.connect('mongodb://localhost/visualizer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ******************
// routes
// ******************

//INDEX - load page
// app.get('/', IndexController.index);

// DASHBOARD - load page
app.get('/dashboard', DashboardController.index);

// DASHBOARD - post new database
app.post('/dashboard/add', DashboardController.addDb);

//DASHBOARD - activate an existing database
app.post('/dashboard/active/:id', DashboardController.activeDb);

//DASHBOARD - delete an existing database
// app.get('/dashboard/remove/:id', DashboardController.removeDb);

//DATAVIEW - load page
app.get('/dataview', DataviewController.index);

// //DATACVIEW - load data for chart
app.post('/dataview', DataviewController.getChart);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
