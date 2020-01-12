const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passLocalMon = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate')


const userSchema = new Schema({
  twitterId: { type: String },
  username: { type: String },
  img: {type: String},
  picks: {type: Schema.Types.ObjectId, ref: 'Splits' }, 
});

userSchema.plugin(passLocalMon);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;
