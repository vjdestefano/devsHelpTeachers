const router = require("express").Router();
const articleRoutes = require("./articles/articlesTest");
const scrapeData = require("./ScapeData/scrape")
// const nytRoutes = require("./nyt/nytRoutes");

router.use("/articles", articleRoutes);
router.use("/search", scrapeData);

module.exports = router;