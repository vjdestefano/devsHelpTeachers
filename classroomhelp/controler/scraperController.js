const Scraper = require("../models/ScraperData");
const ScraperWiki = require("../models/ScrapeWiki");

module.exports = {
  getAllScrapes: function (req, res) {
    Scraper
      .find(req.query)
      .sort({ title: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  //functions for the literacy section of the site
  literacyLinks: function(req, res){
    ScraperWiki
    .find({tag:"Literacy"})
    .sort({points: -1})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  //functionfor the Writing section of the site, searching for tagged things with "writing"
  writingLinks: function(req, res){
    ScraperWiki
    .find({tag:"Writing"})
    .sort({title: 1})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  mathLinks: function(req, res){
    ScraperWiki
    .find({tag:"Math"})
    .sort({title: 1})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  studyLinks: function(req, res){
    ScraperWiki
    .find({tag:"Study Tools"})
    .sort({title: 1})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  votePositive: function(req, res){
    console.log("this is something cool: " + req.body.points);
    ScraperWiki
    .findOneAndUpdate(
      {_id: req.body._id}
    , {$set:{
      points: req.body.points,
    }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findId: function(req, res){
    console.log(req.body)
    ScraperWiki.findById(req.body._id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  // remove: function (req, res) {
  //   ScraperWiki
  //     .findById({ _id: req.body.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }

};


