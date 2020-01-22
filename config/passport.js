// Dependencies
const twit = require("./twitAuth.js");
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const TwitStrategy   = require("passport-twitter").Strategy;
const SALT = 8;



module.exports = function(passport, db){
	passport.serializeUser(function(user, done){done(null, user)});
	passport.deserializeUser(function(user, done){done(null, user)});
	//--------------------------------------------------------------------------------------

	const generateHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(SALT), null);
	};

	// console.log(`first check ------------------------------`)
	// console.log(isValidPassword(`sldjflsdkjf`, `slkdjflskdjf`))
	//Local strategy for username/password authentication
	
	// In order to support login sessions, Passport will serialize and deserialize 
	// user instances to and from the session.
	// Here, the user ID is serialized to the session. 
	// When subsequent requests are received, this ID is used to find the user
	// which will be restored to req.user
	
//------------------------------ LocalAuth ---------------------------------------------
	passport.use('local', new LocalStrategy(
		{ usernameField: 'username', passwordField: 'password' },
	 
		function(username, password, done) {
			
			let newPassword = generateHash(password)
				newPassword = newPassword.replace('$2b$08$', '!^!')

			db.User.findOrCreate({ username: username },
								 { password: newPassword },
			function(err, user) {
				if(err) { return done(err)}
				if(!user) { return done(null, false, { message: 'Incorrect username.' })}

				bCrypt.compare(password, user.password.replace('!^!', '$2b$08$'), function(err, isMatch) {
					if(!isMatch) {return done(null, false, {message: "Your password does not match."})}
				
					let data = Object.assign({}, user._doc)
					delete data.password	
					data.img = 'https://abs.twimg.com/sticky/default_profile_images/default_profile.png'
					
					if(!user.oscar){
						db.Picks.create({'username': user._id})
						.then(picks =>{
							db.User.findOneAndUpdate({ _id: user._id },{ "oscar": picks._id })
							.then(info =>{ return done(err, data) }).catch(err => console.log(err))		
						}).catch(err => console.log(err))
					} else return done(err, data)
				});
			}
		)}
	));	

//----------------------------- TwitterAuth --------------------------------------------
	passport.use(new TwitStrategy({
		consumerKey: twit.consumer_key,
		consumerSecret: twit.consumer_secret,
		callbackURL: twit.callbackURL
  	},
  
  	function(token, tokenSecret, profile, cb) {
		console.log(profile)
		db.User.findOrCreate({ twitterId: profile.id },
		{username: profile._json.name},
			
			function (err, user) {
				let data = Object.assign({}, user._doc)
				data.screenName = `@${profile._json.screen_name}`
				data.img = profile._json.profile_image_url_https.replace("_normal", "")
				if(!user.oscar){
					db.Picks.create({username: user._id},
						function(err, picks){
							db.User.findOneAndUpdate({ _id: user._id }, {"oscar": picks._id, "username": user.username},
								function(err, usre){
									return cb(err, data);		
								}
							)
						} 
					)
				} else return cb(err, data);
			}
		)}
	));
  
  












	// passport.serializeUser(function(user, done){
	// 	console.log("serial ++++++++++++++++++++++++++++++++++++++++++++++++")
	// 	console.log(user.id)
	// 	console.log(user)
	// 	done(null, user.id);
	// });

	// // deserialize user
	// passport.deserializeUser(function(id, done) {
   	//  	User.findById(id).then(function(user) {
	//         if (user) { 
	//             done(null, user.get());
	//         } else {
	//             done(user.errors, null);
	//         }
	//     });
	// });

	// // sign up strategy
	// passport.use('signup', new LocalStrategy(
	// 	// The verify callback for local authentication accepts username and password arguments by default.
	// 	// Set what request fields our usernameField and passwordField are.
	// 	{
	// 		usernameField: 'email',
	// 		passwordField: 'password',
	// 		passReqToCallback: true // allows us to pass the entire request to the callback "done"
	// 	},

	// 	function(req, email, password, done){
	// 		console.log("signup");
			
	// 		// The hashed password generating function
	// 		// Param password and return a hashed password
	// 		var generateHash = function(password){
	// 			return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
	// 		};

	// 		// Check if the emial already exist in the database
	// 		User.findOne({ email: email	})
	// 		.then(function(user){
	// 			console.log(user);
	// 			if(user){
	// 				console.log("user already there")
	// 				// If email exist return a message
	// 				return done(null, false, "That email is already taken.");
	// 			} else {
	// 				// get a hashed password
	// 				var userPassword = generateHash(password);
	// 				// Create an object with user info
	// 				var data = {
	// 					email: email,
	// 					password: userPassword,
	// 					username: req.body.username,
	// 				};
	// 				// Insert user in database
	// 				User.create(data).then(function(newUser, created){
	// 				 	if(!newUser){
	// 				 		return done(null, false, null);
	// 				 	} else {
	// 				 		return done(null, newUser, null);
	// 				 	}
	// 			 	});
	// 			}
	// 		});
	// 	}
	// ));

	// //Signin strategy
	// passport.use('signin', new LocalStrategy(
	// 	// Set what request fields our usernameField and passwordField are.
	// 	{
	// 		usernameField: 'email',
	// 		passwordField: 'password',
	// 		passReqToCallback: true
	// 	},

	// 	function(req, email, password, done){
	// 		console.log("logIn");
	// 		console.log(req.session);
	// 		console.log(email);
	// 		// Function to compare password entered with the one in database
	// 		var isValidPassword = function(userpass, password){
	// 			return bCrypt.compareSync(password, userpass);
	// 		}

	// 		// Check if the emial exist in the database
	// 		User.findOne({ email: email })
	// 		.then(function(user){

	// 			if(!user) {
	// 				// If user does not exist
	// 				return done(null, false, "Email does not exist.");
	// 			}
	// 			// Validate password
	// 			if(!isValidPassword(user.password, password)){
	// 				return done(null, false, "Incorrect password.");
	// 			}

	// 			console.log(user)
	// 			// If the user exist and password is correst
	// 			// get user info
	// 			// data = user.get();
	// 			// console.log("userinfo")
	// 			// console.log(userinfo)

	// 			// Return user info
	// 			return done(null, user);
	// 		});
	// 	}

	// ));
}