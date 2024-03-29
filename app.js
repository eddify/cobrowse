
var express = require('express'),
    http = require('http')


var app = express();
var routes = require('./routes');

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
    app.use(express.compress());
  app.use(express.favicon());
  app.use(useragent.express());
  app.use(express.cookieParser('hsfgfgr453445dfdfe4356'))
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next){
    res.render('web/error', {title: '404', description: 'Sorry, we can\'t find what your looking for!'});
  });
});

app.configure('development', function(){
  //app.use(express.errorHandler());
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
