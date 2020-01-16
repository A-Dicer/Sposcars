const db = require("../models");

module.exports = {
  
//--------------------------- Find All Picks -------------------------------
  findAll: function (req, res) {
    if (req.user) {
      db.Picks.find(req.query)
        .populate({path: 'game.id', select: '-_id -categories -title'})
        .populate({path: 'fighters'})
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//-------------------------- Find picks By ID ------------------------------
  findById: function (req, res) {
    // if (req.user) {
      db.Picks.findOne({"user": req.params.id})
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
    // } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//---------------------------- Create Picks --------------------------------
  create: function(req, res) {
    if (req.user) {
      db.Picks.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//---------------------------- Update Picks --------------------------------

  update: function(req, res) {
    if (req.user) { 
      console.log(req.params.id)
      console.log(req.body)
      db.Picks.findOneAndUpdate({ user: req.params.id }, {$set: {picks: req.body}} )
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },
};