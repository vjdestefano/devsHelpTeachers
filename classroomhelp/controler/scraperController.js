const Scraper = require("../models/ScraperData");
const ScraperLiteracy = require("../models/ScrapeLiteracy");

module.exports = {
  getAllScrapes: function (req, res) {
    Scraper
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  //functions for the literacy section of the site
  literacyLinks: function(req, res){
    ScraperLiteracy
    .find(req.query)
    .sort({title: 1})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }

};


