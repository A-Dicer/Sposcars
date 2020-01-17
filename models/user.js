const mongoose = require("mongoose");
const passLocalMon = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  twitterId: { type: String },
  userName: { type: String },
  oscar: { type: Schema.Types.ObjectId, ref: 'Picks' },
  guru: {type: Boolean, default: false} 
});

userSchema.plugin(passLocalMon);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;
