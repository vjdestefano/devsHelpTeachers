import axios from "axios";

export default {
  
  getAllScrapes: function(){

    console.log("i hit the articles Axios")
    return axios.get("/api/search/findreddit");
  },

  votePositive: function(votes){
    console.log(votes);
    return axios.post("api/search/votepos", votes);
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

  login: function(loginCreds) {
    return axios.post('/api/users/login', loginCreds)
  },
  /* 
    Path to check if user is logged in
  */
  loginCheck: function() {
    return axios.get('/api/users/login')
  },
  /* 
    Path to log out
  */
  logout: function() {
    return axios.get('/api/users/logout')
  },
  /* 
    Path to register new user, you can have more fields than this but "username" and "password" must exist
    userInfo = {
      username: "alex",
      password: 12345Password!
    }
  */
  register: function(userInfo) {
    return axios.post("/api/users/register", userInfo)
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