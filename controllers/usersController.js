const db = require("../models");

module.exports = {

//---------------------------- Find All Users -------------------------------
  findAll: function (req, res) {
      db.User.find(req.query)
        .populate({path: 'oscar', select: 'picks'}) 
        .then(dbModel => res.json({results: dbModel, pass: req.session.passport}))
        .catch(err => res.status(422).json(err));
  },

//-------------------------- Find A User By ID ------------------------------
  findById: function (req, res) {
    if (req.user) {
      db.User.findById(req.params.id)
        .populate({path: 'splits.mtpo'})
        .populate({path: 'splits.spo'})
        .populate({path: 'splits.powii'})
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
      } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//-------------------------- Update User By ID ------------------------------
  update: function(req, res) {
    if (req.user) {
      db.User.findOneAndUpdate({ _id: req.params.id }, req.body )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },
};


