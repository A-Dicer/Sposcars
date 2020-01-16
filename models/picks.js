const mongoose = require("mongoose");
const passLocalMon = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const defaultPicks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
const Schema = mongoose.Schema;

const picksSchema = new Schema({
    user: { type: Schema.Types.ObjectId },
    picks:{ type: Array, default: defaultPicks},
    time: { type: Number },
    date: { type: Date, default: Date.now }
});

picksSchema.plugin(passLocalMon);
picksSchema.plugin(findOrCreate);

const Picks = mongoose.model("Picks", picksSchema);
module.exports = Picks;