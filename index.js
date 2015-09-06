var cool = require("cool-ascii-faces");
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
var app = express();

app.set('port', (process.env.PORT || 5000))

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/cool', function(req, res){
	res.send(cool());
});

/*app.use('/hello', function(req, res, next){
	res.send('Hello World!')
	next();	
});*/

// Connect to MongoDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:meanapp')
mongoose.connection.once('open', function(){
	
	// Load the models
	app.models = require('./models/index');
	
	// Load the routes
	var routes = require('./routes');
	
	_.each(routes, function(controller, route){
		app.use(route, controller(app, route));
	});
	
	//console.log('Listening on port 5000...');
	app.listen(app.get('port'), function() {
		console.log('Node app is running on port', app.get('port'));
	});
});