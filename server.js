//----------------------------- Requirements --------------------------------------------
const express        = require("express");
const bodyParser     = require("body-parser");
const passport       = require("passport");
const TwitStrategy   = require("passport-twitter").Strategy;
const twit           = require("./config/twitAuth.js")
const mongoose       = require("mongoose");
// const socketEvents   = require('./socketEvents');  
const routes         = require("./routes");
const User           = require("./models/user");

//------------------------------- Express -----------------------------------------------
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("client/build"));
app.use(require("express-session")(
  { 
    secret: 'racsops', 
    resave: false, 
    saveUninitialized: false
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

//----------------------------- TwitterAuth --------------------------------------------
passport.use(new TwitStrategy({
  consumerKey: twit.consumer_key,
  consumerSecret: twit.consumer_secret,
  callbackURL: twit.callbackURL
},

function(token, tokenSecret, profile, cb) {
  User.findOrCreate({ twitterId: profile.id },
    {username: profile._json.screen_name},

  function (err, user) {
    user.img = profile._json.profile_image_url_https
    return cb(err, user);
  });
}
));

passport.serializeUser(function(user, done){done(null, user)});
passport.deserializeUser(function(user, done){done(null, user)});

//------------------------------- MongoDB ----------------------------------------------
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/SPOS",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//----------------------------- Start Server --------------------------------------------
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, function(err) { 
  if (err) console.log(err); 
  else console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`); 
});

//------------------------------ Socket.io ----------------------------------------------
// const io = require('socket.io').listen(server);
// socketEvents(io)