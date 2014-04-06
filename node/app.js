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
app.use('/views', express.static(__dirname + '/views'));
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
     	// res.redirect('/front_end/loginpost.hml'); 
    	}
    	console.log ("user in return: " + user);
    	console.log ("=============================");
		console.log(req.session.passport);
    	return res.send({ success : true, message :'authentication succeeded' });

  //  res.redirect('/front_end/profile/profile.html');
  	})(req, res, next);
});

app.post('/device_reg', function(req, res) {
	console.log('HELOOOOOOOOO');
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
			connection.query('INSERT INTO device_instance(belongTo, deviceType, indoorLocation, deviceName, brand, model, communicationType) VALUES(\'' + req.body.belong_to + '\',\'' +
								req.body.device_type + '\',\'' + req.body.indoor_location + '\',\'' + req.body.device_name + '\',\'' + req.body.brand + '\',\'' + req.body.model + '\',\'' + req.body.communication + '\')', function(err, rows, fields) {
				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'query error',
						err: err.code
					});
				}
				else {
					res.send(rows);
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
			// connection.query('INSERT INTO user(username, password, lastname, firstname, streetadd, city, state) VALUES(\''
			// 	+ req.body.username + '\',\'' + req.body.password + '\',\'' + req.body.last_name + '\',\'' + req.body.first_name + '\',\''
			// 	+ req.body.address + '\',\'' + req.body.city + '\',\'' + req.body.state + '\')', function(err, rows, fields) {
			connection.query('INSERT INTO user(username, password, lastname, firstname, streetadd, city, state, country, gps_lat, gps_lon) VALUES(\''
				+ req.body.username + '\',\'' + req.body.password + '\',\'' + req.body.last_name + '\',\'' + req.body.first_name + '\',\''
				+ req.body.address + '\',\'' + req.body.city + '\',\'' + req.body.state + '\',\'USA\',\'20\',\'20\')', function(err, rows, fields) {
				
				console.log('INSERT INTO user(username, password, lastname, firstname, streetadd, city, state, country, gps_lat, gps_lon) VALUES(\''
				+ req.body.username + '\',\'' + req.body.password + '\',\'' + req.body.last_name + '\',\'' + req.body.first_name + '\',\''
				+ req.body.address + '\',\'' + req.body.city + '\',\'' + req.body.state + '\',\'USA\',\'20\',\'20\')');

				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err: err.code
					});
				}
				//res.writeHead(200, { 'Content-Type' : 'application/json' });

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
			});
		}
	})
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
			connection.query('SELECT * FROM device_instance WHERE belongTo = \''+req.params.username+'\'',function(err,rows,fields){
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
					res.render('example',{
						devices:rows,
						title: "My Devices"
					});
				}
			});
		}
	});
});
//app.get('/device_registration', routes.device_registration);

console.log("Server running on port 3001");
app.listen(3001);