var express = require('express'),
db = require('./db'),
passport = require('./auth'),
app = express();
flash = require('connect-flash');

//var = require('./routes');
var path = require('path');
//var MYSQLSessionStore = require('connect-mysql-session')(express);


//app.set('port',proccess.env.PORT || 3001);
//app.use(app.router);
app.use('/views', express.static(__dirname + '/views'));
/*
TODO: better understand EJS and our HTML code output
app.set('views',__dirname+"/front_end");
app.set('view engine', 'html');
*/


app.use(express.cookieParser());
app.use(express.session({
	//store: new MYSQLSessionStore("siots","root","root", {}),
	secret:'thisismysupersecret'
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.favicon());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.engine('.html', require('ejs').__express);

app.set('view engine','html');

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
    	}
    	console.log ("user in return: " + user);
    	console.log ("=============================");
		console.log(req.session.passport);
    	return res.send({ success : true, message :'authentication succeeded' });
  	})(req, res, next);
});

app.post('/device_reg', function(req, res) {
	db.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			return res.send({
				result: 'error',
				err: err.code
			});
		} 
		else {
			connection.query('INSERT INTO device_instance(belongTo, deviceType, indoorLocation, deviceName, brand, model, communicationType) VALUES(\'' + req.body.belong_to + '\',\'' +
								req.body.device_type + '\',\'' + req.body.indoor_location + '\',\'' + req.body.device_name + '\',\'' + req.body.brand + '\',\'' + req.body.model + '\',\'' + req.body.communication + '\')', function(err, rows, fields) {
				if (err) {
					console.error(err);
					res.statusCode = 500;
					return res.send({
						result: 'query error',
						err: err.code
					});
				}
				else {
					
			    	return res.send({ success : true, message :'insert device succeeded' });
					connection.release();
				}
			});
		}
	});
});

app.post('/registration', function(req, res, next) {
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
			console.log('registration');

			connection.query('INSERT INTO user(username, password, lastname, firstname, streetadd, city, state, country, gps_lat, gps_lon, email) VALUES(\''
				+ req.body.username + '\',\'' + req.body.password + '\',\'' + req.body.last_name + '\',\'' + req.body.first_name + '\',\''
				+ req.body.address + '\',\'' + req.body.city + '\',\'' + req.body.state + '\',\'USA\',\'20\',\'20\',\''+req.body.email+'\')', function(err, rows, fields) {

				if (err) {
					console.error(err);
					res.statusCode = 500;
					 return res.send({
						result: 'error',
						err: err.code
					});
				}
				else {
					console.log ("new user inserted.");
    				return res.send({ success : true, message :'user registration is done' });
				}

				//	res.render('profile',{username:"ryan"});
				connection.release();
			});
		}
	}); //db.connection
});

app.get('/devices/:username', function(req,res,next){
	db.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err: err.code
			});
		}
		else{
			connection.query('select * from (device_status d join device_instance i on d.deviceId = i.deviceId) join device_capability_template WHERE property_id = capability_id AND belongTo = \''+ req.params.username +'\'',function(err,rows,fields){
				if (err) {
					console.esrror(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err: err.code
					});
				}
				else{
					console.log("====================");
					console.log(rows);
					res.render('devices',{
						devices:rows,
						title: "My Devices"
					});
				}
			});
		}
	});
});

app.get('/thriends/:username', function(req,res,next){
	db.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err: err.code
			});
		}
		else{
			connection.query('select * from ((relationship r join user u on r.subject_id = u.userid) join device_instance d on r.object_id = d.deviceId) where username = \''+req.params.username+'\' and relationship_temp_id = 5',function(err,rows,fields){
				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err: err.code
					});
				}
				else{
					console.log("====================");
					console.log(JSON.stringify(rows));
					res.render('thriends',{
						thriends:rows,
						title: "My Thriends"
					});
				}
			});
		}
	});
});

app.get('/friends/:username', function(req,res,next) {
	db.getConnection(function(err,connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err: err.code
			});
		}
		else {
			connection.query('SELECT * FROM ( SELECT * FROM relationship r1 JOIN user u1 ON r1.subject_id = u1.userid WHERE r1.relationship_temp_id = 1 AND u1.username = \''
								+ req.params.username + '\') q1 JOIN user u2 ON q1.object_id = u2.userid',function(err,rows,fields){
				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err: err.code
					});
				}
				else{
					console.log("====================");
					console.log(JSON.stringify(rows));
					res.render('friends',{
						friends : rows,
						title : "My Friends"
					});
				}
			});
		}
	});
});

app.get('/users', function(req,res,next) {
	db.getConnection(function(err,connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err: err.code
			});
		}
		else {
			connection.query('SELECT username FROM user',function(err,rows,fields){
				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err: err.code
					});
				}
				else{
					console.log("====================");
					console.log(JSON.stringify(rows));
					res.send(rows);
				}
			});
		}
	});
});


//app.get('/device_registration', routes.device_registration);

//this returns the rendering page of profile.html, 
//the function can be called from login.html after login, or registration.html after registration 
app.get ('/profile/:username', function(req, res, next) {
	console.log ("/profile/username username is " + req.params.username);

	res.render('profile',{username:req.params.username});
});


app.get ('/device_reg/:username', function(req, res, next) {
	console.log ("/device_reg/username username is " + req.params.username);

	res.render('device_reg.html', {username:req.params.username});
});

console.log("Server running on port 3001");
app.listen(3001);