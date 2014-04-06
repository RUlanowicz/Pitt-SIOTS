var mysql = require('mysql');

var connectionpool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'siots'
});

module.exports = connectionpool;