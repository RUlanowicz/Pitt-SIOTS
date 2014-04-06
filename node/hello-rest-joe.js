
var express = require('express'),
	mysql = require('mysql'),
	http = require('http'),
	connectionpool = mysql.createPool({
	    host : 'localhost',
	    user : 'root',
	    password : 'root',
	    database : 'siots'
	});

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3001);
});

app.use(express.json());
app.use(express.urlencoded());
app.use('/front_end', express.static(__dirname + '/front_end'));

app.get("/", function(req, res) {
	res.send("Hello, Express!");
});

app.get("/users/:userid", function(req, res) {
	res.send("<h1>Hello user #" + req.params.userid + "!");
});

app.get("/profile_friends", function(req, res) {
	console.log("helloooooooo");
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
			connection.query('SELECT firstname, lastname FROM users', function(err, rows, fields) {
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

app.post("/login", function(req, res){
	res.send("Creating a new user with the name " + req.body.username + ".");
});

app.post('/device_reg', function(req, res) {
	console.log('HELOOOOOOOOO');
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
			connection.query('INSERT INTO device_template(deviceType, capabilities, brand, model, communication) VALUES(\'' +
								req.body.device_type + '\',\'' +req.body.capabilities + '\',\'' + req.body.brand + '\',\'' + req.body.model + '\',\'' + req.body.communication + '\')', function(err, rows, fields) {
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

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
