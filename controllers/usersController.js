const db = require("../models");

module.exports = {

//---------------------------- Find All Users -------------------------------
  findAll: function (req, res) {
      db.User.find(req.query)
        .populate({path: 'oscar', select: 'picks date'}) 
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
  },

//-------------------------- Find A User By ID ------------------------------
  findById: function (req, res) {
      db.User.findById(req.params.id)
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
  },

//-------------------------- Update User By ID ------------------------------
  update: function(req, res) {
      db.User.findOneAndUpdate({ _id: req.params.id }, req.body )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },

//----------------------------- Create User ---------------------------------
  create: function(req, res) {
      db.User.create(req.body)
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
  },

};


