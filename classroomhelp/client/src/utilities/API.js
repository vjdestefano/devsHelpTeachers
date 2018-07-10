import axios from "axios";

export default {
  // Gets all books
  getAllScrapes: function(){

    console.log("i hit the articles Axios")
    return axios.get("/api/search/findreddit");
  },

  literacyLinks: function(){
    return axios.get("api/search/findlit")
  },

  writingLinks: function(){
    return axios.get("api/search/findwrite")
  },

  mathLinks: function(){
    return axios.get("api/search/findmath")
  },

  studyLinks: function(){
    return axios.get("api/search/findStudy")
  },

  articleSearch: function(query) {
    return axios.get("/api/articles", {params: query})
  },
  // Gets the book with the given id
  getArticlesId: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticles: function(articles) {
    return axios.post("/api/articles", articles);
  },
  registerNewUser: function(info){
    return axios.post("/api/userreg/uobj", info)
  }
};


//API.utils -> API -> controller -> models