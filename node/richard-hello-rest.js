
    var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    connectionpool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'siots'
    });

//added for authentication
var flash = require ('connect-flash');
var passport = require ('passport'); 
var LocalStrategy = require ('passport-local').Strategy; 

app.use (express.json());
app.use (express.urlencoded());
app.use('/front_end', express.static(__dirname + '/front_end'));

app.use (flash());
app.use (passport.initialize());
app.use (passport.session()); 

passport.serializeUser (function (user, done) {
	done (null, user); 
});

passport.deserializeUser (function (user, done) {
	done (null, user); 
}); 

passport.use ('local', new LocalStrategy (function (username, password, done){
	console.log ("passport.use is called");
	//asynchronous verification 
	process.nextTick (function () { 

		connectionpool.getConnection(function(err, connection) {
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
				
				/*				var comparePassword = encrypt.comparePassword(password, user[0].password, function(err,result)
                    {
                        if (err) { return done(err); }

                        console.log(result);
                        return done(null, result);
                    }
                );
				*/
				console.log("user exists: " +  "{ username: '"+ user[0].username + "', password: '" + user[0].password + "}");
				//return done (null, JSON.stringify(user)); 
				return done (null, user); 
				console.log("user returned");
			}); //connection query
		} //else
	})//connectionpool 
}) //process next
}));


/*
app.post ('/login', function(req, res) {
    console.log('req username :' + req.body.username);
    console.log ('req.password :' + req.body.password); 
*/
/* 
	function(req,res){ 
	console.log ("hello"); 

	res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With"); 


    console.log (JSON.stringify (req.body)); 
    console.log ('req.body.username', req.body['username']); 

	var username = req.body.username; 
	var password = req.body.password; 
	console.log ("username: " + username + "password" + password);
    */
/*
    passport.authenticate('local', {
    	successRedirect: '/front_end/profile/profile.html',
    	failureRedirect: '/front_end/loginpost.hml',
    	failureFlash: false 
    })
});
*/
    //    console.log ("hello 2");  
//});


/*
app.post('/login',
  passport.authenticate('local', 
  	{ successRedirect: '/front_end/profile/profile.html', 
  	failureRedirect: '/front_end/loginpost.hml' })
 );

*/


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
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
    return res.send({ success : true, message :'authentication succeeded' });
  //  res.redirect('/front_end/profile/profile.html');
  })(req, res, next);
});


//	this code breaks
app.post('/registration', function(req, res, next) {
	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err: err.code
			});
		}
		else {
			// connection.query('INSERT INTO user(username, password, lastname, firstname, streetadd, city, state) VALUES(\''
			// 	+ req.body.username + '\',\'' + req.body.password + '\',\'' + req.body.last_name + '\',\'' + req.body.first_name + '\',\''
			// 	+ req.body.address + '\',\'' + req.body.city + '\',\'' + req.body.state + '\')', function(err, rows, fields) {
			connection.query('INSERT INTO user(userid, username, password, lastname, firstname, streetadd, city, state, country, gps_lat, gps_lon) VALUES(\'111\',\''
				+ req.body.username + '\',\'' + req.body.password + '\',\'' + req.body.last_name + '\',\'' + req.body.first_name + '\',\''
				+ req.body.address + '\',\'' + req.body.city + '\',\'' + req.body.state + '\',\'USA\',\'20\',\'20\')', function(err, rows, fields) {
				if (err) {
					console.error(err);
					res.statusCode = 500;
					alert("ok");
					res.send({
						result: 'error',
						err: err.code
					});
				}
				res.writeHead(200, { 'Content-Type' : 'application/json' });

				//res.contentType('application/json');

				res.send({
					success: true,
					message: 'success'//,
					// err: '',
					// fields: fields,
					// json:rows,
					// length: rows.length
				});
				//	res.send(rows);
				console.log("rows2: " + JSON.stringify(rows)); 
				connection.release();
				res.end();
			});
		}
	})

  // passport.authenticate('local', function(err, user, info) {
  //   if (err) {
  //   	return next(err); // will generate a 500 error
  //   }
  //   // Generate a JSON response reflecting authentication status
  //   if (! user) {
  //   	console.log ("user is not defined"); 
      
  //    	return res.send({ success : false, message : 'registration failed' });
  //    // res.redirect('/front_end/loginpost.hml'); 
  //   }
  //   console.log ("user in return: " + user);
  //   return res.send({ success : true, message :'registration succeeded' });
  // // res.redirect('/front_end/profile/profile.html');
  // })(req, res, next);
});


app.post('/test', function(req, res){
	//res.statusCode = 200;
	console.log("Here I am\n");
	req.pipe(res);
	//res.sendfile(__dirname + '/front_end/loginpost.html');
	
	// $.ajax({
	// 	success: function() {
	// 		alert("Successful");
	// 	},
	// 	error: function(e) {
	// 		alert("I have an error");
	// 			console.log(e);
	// 	}
	// })

	res.end();
})


app.get('/:test', function(req,res){
	//console.log(req);
	//console.log(res);
/*	
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
*/

	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err: err.code
			});
		} 
		else {
			connection.query('SELECT * FROM `device_capability_template` WHERE capability_id=4', function(err, rows, fields) {
				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err: err.code
					});
				}
				//this is changed area by jieun
				res.contentType('application/json');

/*
			res.send({
					result: 'success',
					err: '',
					fields: fields,
					json:rows,
					length: rows.length
				}); */
			res.send(rows);
				console.log("rows2: " + JSON.stringify(rows)); 
				connection.release();
			});
		}
	});
});

app.get('/:table/:id', function(req,res){});
app.post('/:table', function(req,res){});
app.put('/:table/:id', function(req,res){});
app.delete('/:table/:id', function(req,res){});


app.listen(3001);
console.log('Rest Demo Listening on port 3001');