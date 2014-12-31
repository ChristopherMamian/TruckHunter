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
  app.put('/truck/:id/edit', routes.updateTruck);
  app.get('/trucks', routes.trucks);
  app.get('/users', routes.users);
  // app.post('/users/new', routes.createUser);
  app.put('/users/followTruck', routes.followTruck);
  app.get('/users/:id/trucks', routes.showFollowedTrucks);
  app.delete('/truck/:id/delete', routes.deleteTruck);
  app.post('/authenticate', routes.authenticate);
  app.post('/signin', routes.signin);
  app.get('/me', routes.ensureAuthorized, routes.me);

//   app.post('/authenticate', function(req, res) {
//     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                res.json({
//                     type: true,
//                     data: user,
//                     token: user.token
//                 });
//             } else {
//                 res.json({
//                     type: false,
//                     data: "Incorrect email/password"
//                 });
//             }
//         }
//     });
// });


// app.post('/signin', function(req, res) {
//     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                 res.json({
//                     type: false,
//                     data: "User already exists!"
//                 });
//             } else {
//                 var userModel = new User();
//                 userModel.email = req.body.email;
//                 userModel.password = req.body.password;
//                 userModel.save(function(err, user) {
//                     user.token = jwt.sign(user, 'shhhhh');


//                     user.save(function(err, user1) {
//                         res.json({
//                             type: true,
//                             data: user1,
//                             token: user1.token
//                         });
//                     });
//                 });
//             }
//         }
//     });
// });

// app.get('/me', ensureAuthorized, function(req, res) {
//     User.findOne({token: req.token}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             res.json({
//                 type: true,
//                 data: user
//             });
//         }
//     });
// });

// function ensureAuthorized(req, res, next) {
//     var bearerToken;
//     var bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         var bearer = bearerHeader.split(" ");
//         bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         // res.send(403);
//         res.status(403).end();
//     }
// }

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