// Include http module,
var http = require('http'),
// And mysql module you've just installed.
    mysql = require("mysql");
      
// Create the connection.
// Data is default to new mysql installation and should be changed according to your configuration.
var connection = mysql.createConnection({
    user: "root",
    password: "root",
    database: "siots"
});
 
// Create the http server.
http.createServer(function (request, response) {
    // Attach listener on end event.
    request.on('end', function () {
        // Query the database.
        connection.query('SELECT * FROM users', function (error, rows, fields) {
            response.writeHead(200, {
                'Content-Type': 'x-application/json'
            });
            // Send data as JSON string.
            // Rows variable holds the result of the query.
            response.end(JSON.stringify(rows));
        });
    });
// Listen on the 8124 port.
}).listen(8124,'127.0.0.1');