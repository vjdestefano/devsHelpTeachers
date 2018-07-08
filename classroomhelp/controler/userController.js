// const users = require("../models/user");


// // Defining methods for the test model
// module.exports = {
//   findAll: function (req, res) {
//     users
//       .find(req.query)
//       .sort({
//         date: -1
//       })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },

//   registerNewUser: function (req, res) {

//     // console.log(users.create);
//     console.log(req.body);
//     users.create({
     
//         email: req.body.email,
//         password: req.body.password,
//       })
//       .then(() => User.users.findOrCreate({
//         where: {
//           email: req.body.email
//         },
//       }))
//       .spread((users, created) => {
//         console.log(user.get({
//           plain: true
//         }))
//         console.log(created)

//       })

//   },

// }