var http = require('http'),
	trucks = require('./data'),
	db = require('./db');

  var express = require('express');
  var routes = require('./routes')(trucks);
  var path = require('path');
  var app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    next();
  });

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Truck Tracker');
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // app.get('/truck/:number', routes.truck);
  // app.get('/list', routes.list);
  app.post('/createTruck', routes.createTruck);
  app.put('/truck/:id/updateTruck', routes.updateTruck);
  app.get('/trucks', routes.trucks);
  app.listen(app.get('port'));