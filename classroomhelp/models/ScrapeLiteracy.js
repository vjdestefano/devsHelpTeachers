const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const scraperSchema = new Schema({
  search: { 
    type: String,
   
  
  },
  title: {
    type: String,
    
   
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
  tag:{
    type:String,
  }
  
});

const ScrapeLiteracy = mongoose.model("ScrapeLiteracy", scraperSchema);

module.exports = ScrapeLiteracy;