//module.exports = function () {
	var passport = require('./auth');
	var functions = {};
	
	//POST 
	
	
	//GET 
	functions.device_registration = function (req, res) {
	if (req.session.passport.user === undefined) {
			console.log("redirect");
			res.redirect('http://localhost:3001/front_end/loginpost.html');
		} else {
			console.log ("already authenticated user");
			})
		}
	};
	
//	return functions;
//};

module.exports = functions;