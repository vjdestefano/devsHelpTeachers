const router = require("express").Router();
const articleRoutes = require("./articles/articlesTest");
const scrapeData = require("./ScapeData/scrape")
const userData = require("./Users/UserData");

router.use("/articles", articleRoutes);
router.use("/search", scrapeData);
router.use("/users", userData);

module.exports = router;