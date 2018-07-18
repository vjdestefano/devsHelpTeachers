const router = require("express").Router();
const scraperController = require("../../../controler/scraperController");
const Scrape = require("../../../models/ScraperData");
const ScrapeWiki = require("../../../models/ScrapeWiki");
const path = require("path");

const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");


// mongoose.connect("mongodb://localhost/schoolZone");



router
  .route("/scrapereddit")
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

          result.link2Data = $(element).children().attr("data-url");

          // Create a new Article using the `result` object built from scraping
          Scrape.create(result)
            .then(function (dbArticle) {

              console.log(dbArticle);
              if (i === $("a").length) {
                res.send("scrape complete");
              }
            })

        });

        // If we were able to successfully scrape and save an Article, send a message to the client
      }).catch(function (err) {
        // If an error occurred, send it to the client
        return res.json(err);
      });
  });

router
  .route("/scrapeliter")
  .get(function (req, res) {
    console.log(req.query);

    axios
      .get(`http://udltechtoolkit.wikispaces.com/Literacy%20tools`)
      .then(function (response) {

        var $ = cheerio.load(response.data);
        console.log("this hit the cheerio")
        // Now, we grab every h2 within an article tag, and do the following:
        $("a.wiki_link_ext").each(function (i, element) {
        
          
          // Save an empty result object
          const result = {};


          if(i < 49){

            result.title = $(element).text();

             // Add the text and href of every link, and save them as properties of the result object
            result.link = $(element).attr("href");
  
            result.content = $(element).parent("li").text();
  
            result.tag = "Literacy"

            result.points = 0;
  
            // Create a new Article using the `result` object built from scraping
            ScrapeWiki.create(result)
              .then(function (dbArticle) {
  
                console.log(dbArticle);
              
                  res.redirect("/");
              
              })

          }
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
      }).catch(function (err) {
        console.log(err)
        // If an error occurred, send it to the client
        return res.json(err);
      });

  });


  router
  .route("/scrapewrite")
  .get(function (req, res) {
    console.log(req.query);

    axios
      .get(`http://udltechtoolkit.wikispaces.com/Writing%20tools`)
      .then(function (response) {

        var $ = cheerio.load(response.data);
        console.log("this hit the cheerio")
        // Now, we grab every h2 within an article tag, and do the following:
        $("a.wiki_link_ext").each(function (i, element) {
        
          
          // Save an empty result object
          const result = {};


          if(i < 49){

            result.title = $(element).text();

             // Add the text and href of every link, and save them as properties of the result object
            result.link = $(element).attr("href");
  
            result.content = $(element).parent("li").text();
  
            result.tag = "Writing"

            result.points = 0;
  
            // Create a new Article using the `result` object built from scraping
            ScrapeWiki.create(result)
              .then(function (dbArticle) {
  
                console.log(dbArticle);
              
                  res.json(dbArticle);
               
              })

          }
       
         

        });

        // If we were able to successfully scrape and save an Article, send a message to the client
      }).catch(function (err) {
        // If an error occurred, send it to the client
        return res.json(err);
      });

  });


  router
  .route("/scrapemath")
  .get(function (req, res) {
    console.log(req.query);

    axios
      .get(`http://udltechtoolkit.wikispaces.com/Math%20tools`)
      .then(function (response) {

        var $ = cheerio.load(response.data);
        console.log("this hit the cheerio")
        // Now, we grab every h2 within an article tag, and do the following:
        $("a.wiki_link_ext").each(function (i, element) {
        
          
          // Save an empty result object
          const result = {};


          if(i < 42){

            result.title = $(element).text();

             // Add the text and href of every link, and save them as properties of the result object
            result.link = $(element).attr("href");
  
            result.content = $(element).parent("li").text();
  
            result.tag = "Math"
  
            result.points = 0;
            // Create a new Article using the `result` object built from scraping
            ScrapeWiki.create(result)
              .then(function (dbArticle) {
  
                console.log(dbArticle);
                
                  res.send("scrape math support finished");
                
              })

          }
       
         

        });

        // If we were able to successfully scrape and save an Article, send a message to the client
      }).catch(function (err) {
        // If an error occurred, send it to the client
        return res.json(err);
      });

  });

  router
  .route("/scrapestudy")
  .get(function (req, res) {
    console.log(req.query);

    axios
      .get(`http://udltechtoolkit.wikispaces.com/Study%20skills%20tools`)
      .then(function (response) {

        var $ = cheerio.load(response.data);
        console.log("this hit the cheerio")
        // Now, we grab every h2 within an article tag, and do the following:
        $("a.wiki_link_ext").each(function (i, element) {
        
          
          // Save an empty result object
          const result = {};


          if(i < 29){

            result.title = $(element).text();

             // Add the text and href of every link, and save them as properties of the result object
            result.link = $(element).attr("href");
  
            result.content = $(element).parent("li").text();
  
            result.tag = "Study Tools";

            result.points = 0;
  
            // Create a new Article using the `result` object built from scraping
            ScrapeWiki.create(result)
              .then(function (dbArticle) {
  
                console.log(dbArticle);
              
                  res.send("scrape study tools support finished");
               
              })
          }
       });

        // If we were able to successfully scrape and save an Article, send a message to the client
      }).catch(function (err) {
        // If an error occurred, send it to the client
        return res.json(err);
      });

  });


router.route("/votepos")
.get(scraperController.findId)
.post(scraperController.votePositive);

router.route("/voteneg")
.get(scraperController.findId)
.post(scraperController.votePositive);

router
  .route("/findreddit")
  .get(scraperController.getAllScrapes);

router
  .route("/findlit")
  .get(scraperController.literacyLinks);

router
  .route("/findwriting")
  .get(scraperController.writingLinks)

router
  .route("/findmath")
  .get(scraperController.mathLinks)

router
  .route("/findstudy")
  .get(scraperController.studyLinks)


module.exports = router;