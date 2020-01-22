const twit = require("./twitAuth.js");
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const TwitStrategy   = require("passport-twitter").Strategy;
const SALT = 8;

module.exports = function(passport, db){

//--------------------------- serial/deserial ------------------------------------------
	passport.serializeUser(function(user, done){done(null, user)});
	passport.deserializeUser(function(user, done){done(null, user)});

//----------------------------- bcyrptHash ---------------------------------------------
	const generateHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(SALT), null);
	};
	
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
}