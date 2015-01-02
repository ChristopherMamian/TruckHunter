  var express = require('express');
  var path = require('path');
  var morgan = require("morgan");
  var app = express();


  // all environments
  app.set('port', process.env.PORT || 9393);

  app.use(morgan("dev"));

  app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Truck Tracker');
    next();
  });

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));

  app.get("/", function(req, res) {
    res.render("index.html");
  });

  // development only
  if ('development' == app.get('env')) {
    // app.use(express.errorHandler());
  }

  app.listen(app.get('port'));