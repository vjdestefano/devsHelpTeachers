const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//testmodel -> controler -> api/articles/articlesTest
let test = console.log("im here at the schema");

test;
//this connects to controler
const articleSchema = new Schema({
  
  title: { 
    type: String, 
    // required: true 
  },
  url: String,
  date: { 
    type: Date
  }
});

const Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;