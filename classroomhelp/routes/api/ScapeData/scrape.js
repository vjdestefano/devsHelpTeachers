const router = require("express").Router();
// const scrapeController = require("../../../controler/scraperController");
const scraper = require("../../../models/ScraperData")
const path = require("path");

const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/schoolZone");



router
  .route("/")
  .get(function (req, res) {
    console.log(req.query);
    
    axios
      .get(`https://old.reddit.com/r/Teachers/`)
      .then(function (response) {

        var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("a.Title-may-blank").each(function (i, element) {
              // Save an empty result object
              let result = {};
        
              // Add the text and href of every link, and save them as properties of the result object
              result.title = $(element).text();
        
              result.link = $(element).attr("data-outbound-url");
        
              // Create a new Article using the `result` object built from scraping
              scraper.Scraper.create(result)
                .then(function (dbArticle) {

                 console.log(result);
                  
                 console.log(dbArticle);
                })
                .catch(function (err) {
                  // If an error occurred, send it to the client
                  return res.json(err);
                });
            });
        
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("scrape complete");
          })
        })
// //this is connected to the  scrape controller!
// // Matches with "/api/articles"
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