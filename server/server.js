  var http = require('http'),
  trucks = require('./data'),
  db = require('./db');

  var express = require('express');
  // console.log(trucks);
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

  app.post('/trucks/new', routes.createTruck);
  app.put('/truck/:id/edit', routes.updateTruck);
  app.get('/trucks', routes.trucks);
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