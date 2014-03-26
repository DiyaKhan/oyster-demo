// load config
var config = require('./config')();

var express = require('express'),
app = module.exports = express();
require("./components/index")(); // this will load all external components that will be consumed

global.Packages.Oyster.Utils.logger("demo", null, {console: true});

// all environments
app.set('title', 'Oyster Demo');
process.env.PORT = config.port;

// development only
if ('development' == app.get('env')) {
}

// production only
if ('production' == app.get('env')) {
}

var allowAjax = require('./middleware/allow_ajax');

app.use(express.bodyParser()); //request bodyparsing to json
app.use(express.methodOverride()); // enable PUT and DELETE http methods
app.use(express.compress()); // compress response data with gzip / deflate

// views
app.set("views", __dirname + "/public/views"); // setting view path
app.set("view engine", 'html');

app.use(express.static(__dirname + '/public')); //for static files to serve directly.
app.use(allowAjax); // allowing app to deal with ajax calls
app.engine('html', require('ejs').renderFile); //mapping html to ejs renderer for rendering html files

app.use(global.Packages.Oyster.Middleware.param_object);

app.use(app.router);

require("./routes")(app); // load all routes

app.use(global.Packages.Oyster.Middleware.error_handler); // to handle all the errors that are raised on app (should pass express cycle for e.g must call next(err); )

// start
app.listen(config.port);
global.Logger.info("-------server started---------");