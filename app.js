
/**
 * Module dependencies.
 */

var express = require('express');
var resource = require('express-resource');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: 'koizuss/gain'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new GoogleStrategy({
	returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
	console.log('identifier:', identifier);
	console.log('profile:', profile);
	console.log('done:', done);

	done(null, profile);
  }
));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.resource('account', require('./routes/account'));
app.resource('setlist', require('./routes/setlist'));

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
