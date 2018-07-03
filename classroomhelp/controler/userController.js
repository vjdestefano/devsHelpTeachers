const User = require("../models/user");
const SQL = require("mysql");

// Defining methods for the test model
module.exports = {
  findAll: function (req, res) {
    User
      .find(req.query)
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  registerNewUser: function (req, res) {
    User.create({
        email: req.query
      })
      .then(() => User.findOrCreate({
        where: {
          email: req.query
        },
      }))
      .spread((user, created) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)

      })

  },

}