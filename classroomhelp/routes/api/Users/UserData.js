const router = require("express").Router();
const userController = require("../../../controler/userController");


//this is connected to the  article controller!
// Matches with "/api/articles"
router
  .route("/")
  .get(userController.findAll)
  
// Matches with "/api/articles/:id"
// router
//   .route("/:test")
//   .get(userController.findById)
//   .put(userController.update)
  

  router.route("/uobj").post(userController.registerNewUser);
module.exports = router;