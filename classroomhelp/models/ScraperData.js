const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scraperSchema = new Schema({
  search: { 
    type: String, 
    required: true 
  },
  title: {
    type: String,
    required: true
  },
  picture: { 
    type: String,
  },
  content: {
    type: String,
  },
  link:{
    type: String,
  }
});

const Scrape = mongoose.model("Scrape", scraperSchema);

module.exports = Scrape;