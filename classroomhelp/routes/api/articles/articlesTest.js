const router = require("express").Router();
const articleController = require("../../../controler/articleController");


//this is connected to the  article controller!
// Matches with "/api/articles"
router
  .route("/")
  .get(articleController.findAll);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;