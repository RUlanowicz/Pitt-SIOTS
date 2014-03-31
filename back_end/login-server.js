
var flash = require('connect-flash');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express(),
mysql = require('mysql'),
connectionpool = mysql.createPool({
host : 'localhost',
user : 'root',
password : 'root',
database : 'siots'
});

passport.use(new LocalStrategy(function(username,password,done){
   connectionpool.query("select * from user where username='"+username+"'     ",function(err,user){
    if(err)
    {
        return done(err);           
    }
    if(!user)
    {
        return done(null,false,{message: 'Incorrect user name'});           
    }
    if(user.password != password)
    {
       return done(null,false,{message: 'Incorrect password'});
    }

    return done(null,user);     

   });
}
));

app.get('/userauth', function(req,res){
	console.log("request working");
	connectionpool.query('SELECT * FROM user', function(err, rows, fields) {
				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err: err.code
					});
				}
				res.set('Content-Type','application/javascript');
				res.jsonp({
					result: 'success',
					err: '',
					fields: fields,
					json: rows,
					length: rows.length
				});
				//connectionpool.release();
			});
		});

app.listen(3000);
console.log("working");