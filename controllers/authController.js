const twit = require("../config/twitAuth.js");
const passport = require("passport");

module.exports = {

  doLogin: function(req, res, next){
		passport.authenticate('local', function(err, user, msg){
			console.log("comingback");
			console.log(user);
			console.log()
			if (err) { return next(err); }
			if (!user){
				// send a response object with any error or messages.
				var data = {
					error: err,
					msg: msg
				}
				return res.json(data);
			}
			if(user){
				console.log("sess start?")
				// If user is created successfully, establish a session and send a response.
			 	req.logIn(user, function(){
			 		return res.json(user);
				 });
				 
			}
		})(req, res, next);
	},

  // doLogin: function(req, res, next){
	// 	// authenticate the user
	// 	passport.authenticate("signin", function(err, user, msg){
	// 		console.log("yo yo yo yo")
	// 		if(user){
	// 			console.log("success")
	// 			// If user sign in successfully, establish a session and send a response.
	// 		 	req.logIn(user, function(){
	// 			return res.status(200).json({ result: 'success', user: req.user, session: req.session });
	// 		 	});
	// 		} else {

	// 			// If authentication fail, send a response object with any error or messages.
	// 			var data = {
	// 			 		error: err,
	// 			 		msg: msg
	// 				}
	// 			return res.json(data);	
	// 		}
	// 	})(req, res, next);
	// },
//-------------------- Twitter login/Callback -------------------------

  // twitter: function(req, res){ passport.authenticate('twitter'),
  //   function(req, res){
  //     console.log('twitter callback')
  //   }

  // },

  // twitCallBack: function(req, res){
  //   passport.authenticate("twitter", { failureRedirect: "/" }), 
  //     function(req, res) {
  //       res.redirect(`${twit.redirect}/${req.user._id}` );
  //   }
  // },


//------------------------- LogOut User -------------------------------
  logout: function (req, res) { req.logOut(); res.redirect(twit.redirect)}
};
