const mongoose = require("mongoose");
const passLocalMon = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  twitterId: { type: String },
  oscar: { type: Schema.Types.ObjectId, ref: 'Picks' },
  guru: { type: Boolean, default: false }, 
  password: { type: String },
  email: { type: String },
  points: {type: Number, default: null},
  place: {type: Number, default: null},
  movement: {type: Number, default: null},
  direction: {type: String, default: ''}
});

userSchema.plugin(passLocalMon);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;
