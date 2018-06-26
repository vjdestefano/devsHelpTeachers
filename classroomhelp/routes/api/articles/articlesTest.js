const router = require("express").Router();
const articleController = require("../../../controler/articleControler");


//this is connected to the  article controller!
// Matches with "/api/articles"
router
  .route("/")
  .get(articleController.findAll)
  .post(articleController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;