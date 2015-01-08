  var http = require('http'),
  db = require('./db');
  var express = require('express');
  var morgan = require("morgan");
  var bodyParser = require("body-parser");
  var jwt = require("jsonwebtoken");
  var mongoose = require("mongoose");
  var routes = require('./routes')(db);
  var path = require('path');
  var app = express();

  var favicon = require('serve-favicon');
  var methodOverride = require('method-override');
  var session = require('express-session');
  var multer = require('multer');
  var errorHandler = require('error-handler');
  var User = require('../server/schemas/user');

  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
  });

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Truck Tracker');
    next();
  });
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    // app.use(express.errorHandler());
  }

  app.post('/trucks/new', routes.createTruck);
  // app.put('/truck/:id/edit', routes.updateTruck);
  app.put('/truck/edit', routes.updateTruck);

  app.get('/trucks', routes.trucks);
  app.get('/users', routes.users);
  // app.post('/users/new', routes.createUser);
  app.put('/users/followTruck/:truckId', routes.ensureAuthorized, routes.followTruck);
  app.get('/users/:id/trucks', routes.showFollowedTrucks);
  app.delete('/truck/:id/delete', routes.deleteTruck);
  app.post('/authenticate', routes.authenticate);
  app.post('/signin', routes.signin);
  app.get('/me', routes.ensureAuthorized, routes.me);
  app.get('/fuck', routes.ensureAuthorized, routes.meTrucks);


  //These routes handles user login, signup and token based auth. The /me route is protected and can only be seen by users that have accounts. I deleted the /users/new route above because this is taken care of in the signin route. -Sam


process.on('uncaughtException', function(err) {
    console.log(err);
});
  app.listen(app.get('port'));

  // app.get('/truck/:number', routes.truck);
  // app.get('/list', routes.list);


  // Sam's Notes //
  /*
  The route you hit in the server is on the left
  and the action that occurs inside of the route is
  on the right ---> 'routes.createTruck'.
  */

  /* Nick, what you noted below are indeed alternatives
  to the way we have it above. The example you show below uses anonymous functions, and we have named functions. Named functions should make it more readable for all of us and easier to follow what is going on. The way we have it separates the function part of the http request into the routes index.js file. - Sam
  */

  // Nick's Notes //
  // ** functions below are either alternatives to the ones posted below or are dynamic versions of them

  // app.get('/trucks', function(req, res){
  //   mongoose.model('truck').find(function(err, trucks){
  //     res.send(trucks)
  //   })
  // })
  //** no model name to reference
  // app.get('/createTruck', function(req, res){
  //   mongoose.model('posts??').find(function(err, trucks){
  //     res.send(posts)
  //   })