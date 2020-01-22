//----------------------------- Requirements --------------------------------------------
const express        = require("express");
const bodyParser     = require("body-parser");
const passport       = require("passport");
const TwitStrategy   = require("passport-twitter").Strategy;
const twit           = require("./config/twitAuth.js")
const mongoose       = require("mongoose");
const socketEvents   = require('./socketEvents');  
const routes         = require("./routes");
const db             = require("./models");

//------------------------------- Express -----------------------------------------------
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("oscars/build"));
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

//------------------------------ Passport ----------------------------------------------
require("./config/passport.js")(passport, db); //load passport strategies

//------------------------------- MongoDB ----------------------------------------------
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

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
const io = require('socket.io').listen(server);
socketEvents(io)