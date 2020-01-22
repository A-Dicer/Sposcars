const db = require("../models");

module.exports = {
  
//--------------------------- Find All Picks -------------------------------
  findAll: function (req, res) {
      db.Picks.find(req.query)
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
  },

//-------------------------- Find picks By ID ------------------------------
  findById: function (req, res) {
      db.Picks.findOne({"username": req.params.id})
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
  },

//---------------------------- Create Picks --------------------------------
  create: function(req, res) {
      db.Picks.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },

//---------------------------- Update Picks --------------------------------

  update: function(req, res) {
    if (req.user) { 
      db.Picks.findOneAndUpdate({ username: req.params.id }, {$set: {picks: req.body}} )
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },
};