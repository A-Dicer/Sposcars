//----------------------------- Requirements --------------------------------------------
const express        = require("express");
const bodyParser     = require("body-parser");
const passport       = require("passport");
const TwitStrategy   = require("passport-twitter").Strategy;
const twit           = require("./config/twitAuth.js")
const mongoose       = require("mongoose");
// const socketEvents   = require('./socketEvents');  
const routes         = require("./routes");
const db             = require("./models");

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
  db.User.findOrCreate({ twitterId: profile.id },
    {userName: profile._json.name},
  
  function (err, user) {
    db.Picks.findOrCreate({user: user._id},
        function(err, picks){
          // user.picks ? console.log(`true`) : console.log('false')
          user.oscar
            ? null
            : db.User.findOneAndUpdate({ _id: user._id }, {"oscar": picks._id},
                function(err, usre){
                  
                }
              )
              
              let data = Object.assign({}, user._doc)
          
              data.screenName = `@${profile._json.screen_name}`
              data.img = profile._json.profile_image_url_https.replace("_normal", "")
              data.background = profile._json.profile_banner_url
              data.oscar = picks.picks
              
              return cb(err, data);
        }
      )
  });
}
));


passport.serializeUser(function(user, done){done(null, user)});
passport.deserializeUser(function(user, done){done(null, user)});

//------------------------------- MongoDB ----------------------------------------------
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/SPOS",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//----------------------------- Start Server --------------------------------------------
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function(err) { 
  if (err) console.log(err); 
  else console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`); 
});

//------------------------------ Socket.io ----------------------------------------------
// const io = require('socket.io').listen(server);
// socketEvents(io)