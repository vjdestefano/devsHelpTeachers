const User = require("../models/user");
const SQL = require("mysql2");

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
    console.log(req.body);
    User.users.create({
     
        email: req.body.email,
        password: req.body.password,
      })
      .then(() => User.users.findOrCreate({
        where: {
          email: req.body
        },
      }))
      .spread((users, created) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)

      })

  },

}