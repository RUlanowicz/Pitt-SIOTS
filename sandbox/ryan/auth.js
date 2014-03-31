	var db = require('./db');
	var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;
	
	passport.use ('local', new LocalStrategy (function (username, password, done){
		console.log ("passport.use is called");
		//asynchronous verification 
		process.nextTick (function () { 
	
			db.getConnection(function(err, connection) {
			if (err) {
				console.error('CONNECTION error: ',err);
				res.statusCode = 503;
				res.send({
					result: 'error',
					err: err.code
				});
			} 
			else {
	
				connection.query("select username, password from user where username = '" + username +"'", 
					function (error, user) {
					console.log (JSON.stringify (user));
	
					if (error) {
						console.error(err);
						return done (error); 
					}
	
					if (!user) { //user is defined from the result of mysql query 
						console.log ("user does not exist"); 
						return done (null, false, {message: 'Incorrect username'}); 
					}
	
					if(user[0].password != password) {
						console.log("password is different: " +  user[0].password + " " + password); 
						return done (null, false, {message: 'Incorrect password'}); 
					}
					console.log("user exists: " +  "{ username: '"+ user[0].username + "', password: '" + user[0].password + "}");
					//return done (null, JSON.stringify(user)); 
					return done (null, user); 
					console.log("user returned");
				}); //connection query
			} //else
		})//connectionpool 
	}) //process next
	}));
	
	passport.serializeUser(function(user, done) {
		console.log ("=============================");
		console.log("user serializeUser called");
		done(null, user);
	});
	
	passport.deserializeUser(function(user, done) {
		console.log ("=============================");
		console.log("user deserializeUser called");
		done(null, user);
	});
	
	module.exports = passport;