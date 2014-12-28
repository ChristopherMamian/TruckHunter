  var express = require('express');
  var path = require('path');
  var app = express();

  // all environments
  app.set('port', process.env.PORT || 9393);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
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

  console.log(__dirname);

  app.get('/', function( req, res ){
    res.render('index.html');
  });

  app.listen(app.get('port'));