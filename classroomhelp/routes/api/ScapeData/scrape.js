const router = require("express").Router();
// const scrapeController = require("../../../controler/scraperController");
const Scrape = require("../../../models/ScraperData")
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
        console.log("this hit the cheerio")
            // Now, we grab every h2 within an article tag, and do the following:
            $("p.title").each(function (i, element) {
              console.log("found element on the site")
              // Save an empty result object
              const result = {};

            console.log(result);
        
              // Add the text and href of every link, and save them as properties of the result object
              result.title = $(element).children().text();
        
              result.link = $(element).children().attr("data-outbound-url");

              result.search = $(element).children().attr("data-subreddit");
        
              // Create a new Article using the `result` object built from scraping
              Scrape.create(result)
                .then(function (dbArticle) {
                  
                 console.log(dbArticle);
                  if (i = $("a").length) {
                    res.send("scrape complete");
                  }
                })
                
            });
        
            // If we were able to successfully scrape and save an Article, send a message to the client
          }).catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
        })




module.exports = router;