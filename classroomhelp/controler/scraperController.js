const Scraper = require("../models/ScraperData");

module.exports = {
  findAll: function (req, res) {
    Scraper
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};


