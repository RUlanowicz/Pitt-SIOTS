var express = require('express'),
db = require('./db'),
passport = require('./auth'),
app = express();
flash = require('connect-flash');

//var = require('./routes');
var path = require('path');
var MYSQLSessionStore = require('connect-mysql-session')(express);


//app.set('port',proccess.env.PORT || 3001);
//app.use(app.router);
app.use('/front_end', express.static(__dirname + '/front_end'));
/*
TODO: better understand EJS and our HTML code output
app.set('views',__dirname+"/front_end");
app.set('view engine', 'html');
*/


app.use(express.cookieParser());
app.use(express.session({
	store: new MYSQLSessionStore("siots","root","root", {}),
	secret:'thisismysupersecret'
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.favicon());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());

app.post('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	  	console.log("login called");
    	if (err) {
      		return next(err); // will generate a 500 error
    	}
    	// Generate a JSON response reflecting authentication status
    	if (! user) {
    		console.log ("user is not defined"); 
      
     	return res.send({ success : false, message : 'authentication failed' });
     	// res.redirect('/front_end/loginpost.hml'); 
    	}
    	console.log ("user in return: " + user);
    	console.log ("=============================");
		console.log(req.session.passport);
    	return res.send({ success : true, message :'authentication succeeded' });

  //  res.redirect('/front_end/profile/profile.html');
  	})(req, res, next);
});

app.post('/device_registration', function(req, res, next){
	console.log("api called");
	console.log("cookie :" + req.cookie);
	console.log("session :" + req.session);
	if(req.session.passport.user === undefined) {
		console.log("session not established");
	}
	else {
		console.log("session established already");
	}
});

//app.get('/device_registration', routes.device_registration);

app.listen(3001);