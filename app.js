//web server

/**
 *process.env.NODE_ENV = "development";
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , webroutes = require('./routes/web')
  , http = require('http')
  , path = require('path')
  , useragent = require('express-useragent')
  , ws = require('./lib/drumbi-webservice')
  , logger = require('./lib/drumbi-logger')
  , DEMO_API_SERVER
  , WIDGET_API_SERVER
  , HTTP_LISTEN_PORT
  , SERVER_WS_TIMEOUT
  , SERVER_WS_MAX_RETRIES
  , SERVER_WS_RETRY_WAIT
  , CLIENT_WS_TIMEOUT
  , CLIENT_WS_MAX_RETRIES
  , CLIENT_WS_RETRY_WAIT
  , WS_API_SERVER
  , nconf =  require('nconf')
  , uuid = require('node-uuid')
  , async = require('async');

nconf.argv()
     .env()
     .add( 'user', {file: __dirname + '/config/default.json', type: 'file'})
     .add( 'global', {file: __dirname + '/config/' + process.env.NODE_ENV + '.json',  type: 'file'});



var app = express();
API_SERVER = nconf.get('api_server');
DEMO_API_SERVER = nconf.get('provider_api_server');
WIDGET_API_SERVER = nconf.get('widget_api_server');
HTTP_LISTEN_PORT = nconf.get('listen_port')
SERVER_WS_TIMEOUT = nconf.get('server_ws_timeout');
SERVER_WS_MAX_RETRIES = nconf.get('server_ws_max_retries');
SERVER_WS_RETRY_WAIT = nconf.get('server_ws_retry_wait');
CLIENT_WS_TIMEOUT = nconf.get('client_ws_timeout');
CLIENT_WS_MAX_RETRIES = nconf.get('client_ws_max_retries');
CLIENT_WS_RETRY_WAIT = nconf.get('client_ws_retry_wait');
API_SERVER = nconf.get('api_server');
var cacheControl = function( req, res, next) {
  res.header('Cache-Control', 'public, must-revalidate, max-age=0')
  next();
}


app.configure(function(){
  app.set('port', process.env.PORT || HTTP_LISTEN_PORT);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(cacheControl)
  if(nconf.get('gzip'))
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
  logger.log("Express server listening on port " + app.get('port'));
});
