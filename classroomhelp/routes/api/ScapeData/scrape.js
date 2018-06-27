const router = require("express").Router();
// const scrapeController = require("../../../controler/scraperController");
const scraper = require("../../../models/ScraperData")
const path = require("path");

const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");


router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with request
  axios.get("https://old.reddit.com/r/bourbon/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("a.title.may-blank").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.search = $(element).text();

      result.link = $(element).attr("data-outbound-url");

      // Create a new Article using the `result` object built from scraping
      scraper.Scrape.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.post("Scrape Complete");
  });
});


router
  .route("/test")
  .get(function (req, res) {
    console.log(req.query);
    
    axios
      .get(`https://old.reddit.com/r/bourbon/`)
      .then(function (response) {
        console.log(response);
        var $ = cheerio.load(response.data);
        
        
         


        res.json(articleData.data)
        console.log(res.json(articleData.data))
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });

  })

//this is connected to the  scrape controller!
// Matches with "/api/articles"
// router
//   .route("/:search")
//   .get(scrapeController.findAll)
//   .post(scrapeController.create);

// // Matches with "/api/articles/:id"
// router
//   .route("/:id")
//   .get(scrapeController.findById)
//   .put(scrapeController.update)
//   .delete(scrapeController.remove);

module.exports = router;