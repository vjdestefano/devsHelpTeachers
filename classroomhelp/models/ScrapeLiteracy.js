const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const scraperSchema = new Schema({
  search: { 
    type: String, 
    // required: true 
  },
  title: {
    type: String,
    // required: true
  },
  picture: { 
    type: String,
  },
  content: {
    type: String,
  },
  link:{
    type: String,
  },
  link2Data:{
    type: String,
  }
  
});

const ScrapeLiteracy = mongoose.model("ScrapeLiteracy", scraperSchema);

module.exports = ScrapeLiteracy;