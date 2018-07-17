
const User = require('../models/user');

module.exports = {

  pushHelpers: function (req, res) {
    User
      .update({username: req.body.username},
     { $push:{savedHelpers: req.body.id}})
      .then(dbModel =>{
        // let voted = dbModel.savedHelpers
        // res.json(voted);
        res.json(dbModel);
        })
      .catch(err => res.status(422).json(err));
  },

  findUsername: function (req, res) {
    User
      .findOne(req.body)
      .then(dbModel =>{
        console.log(dbModel);
        // let voted = dbModel.savedHelpers
        // res.json(voted);
        res.json(dbModel);
        })
      .catch(err => res.status(422).json(err));
  },

  findAll: function (req, res) {
    User
      .find(req.query)
      .sort({date: 1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
   User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    User.findOneAndUpdate({
      _id: req.params.id
    }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
  User
      .findById({_id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register: function (req, res) {
    /* To create a new user */
    User
      .register(new User({username: req.body.username}), req.body.password, function (err) {
        if (err) {
          console.log('error while user register!', err);
          return res.status(422).json(err);
        }
        console.log('user registered!');
        res.json(true);
      });
  }
};