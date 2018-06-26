const router = require("express").Router();
const articleRoutes = require("./articles/articlesTest");
// const nytRoutes = require("./nyt/nytRoutes");

router.use("/articles", articleRoutes);
// router.use("/nyt", nytRoutes);

module.exports = router;