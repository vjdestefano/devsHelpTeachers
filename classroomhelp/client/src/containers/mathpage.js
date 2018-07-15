import React, {Component} from "react";
import API from "../utilities/API";
import "../style/mainpage.css"

class mathPage extends Component {

state = {
  articles:[],
  scrapeData:'',
  username:"",
  isLoggedIn: false,

}

componentDidMount(){
 this.loadLinks();
 this.loginCheck();
};

loginCheck = () => {
  API
    .loginCheck()
    .then(res =>{
      console.log(res);
      this.setState({
      isLoggedIn: res.data.isLoggedIn, username: res.data.username
      })
    }) 
    .catch(err => {
      console.log("this is an error")
      console.log(err);
      this.setState({isLoggedIn: false})
      this.loadLinks();
    })
};
loadLinks(){
  API.mathLinks().then(res => {
    console.log(res.data);
    this.setState({
      articles: res.data,
      dataType: res.data[0].tag
    })
  })
  .catch(err => console.log(err))
};

ifEmpty = obj =>{
  if(obj.content.length === 0){
    return true
  } else return false
}

userObj = (obj) =>{
  if(obj){
    return true;
  } else{
    return false;
  }
};



  upvote = (id, score) => {
    const upvoted = this.state.articles.find(article => (article._id === id));
    let grabScore = upvoted.points;

    grabScore++;

    API.votePositive({
      _id: upvoted._id,
      title: upvoted.title,
      link: upvoted.link,
      points: grabScore,
    })
      .then(res => {

        this.loadLinks();
      }
    )
      .catch(err => console.log(err));
  }

  downvote = (id, score) => {
    const downVoted = this.state.articles.find(article => (article._id === id));
    let grabScore = downVoted.points;

    grabScore--;   
   
    API.voteNegative({
      _id: downVoted._id,
      title: downVoted.title,
      link: downVoted.link,
      points: grabScore,
    })
    .then(res => {
      
      this.loadLinks();
      console.log(res)})
    .catch(err => console.log(err));
  }


render(){

  const inlineStyle = {
    backgroundColor: "black",
    color: "white",
    borderColor: "#f57c00",
  };

  return(

   <div className = "container">
    <div className = "row" id = "userSection">
      <div className = 'col-12 d-flex justify-content-sm-center'>
      {this.userObj(this.state.isLoggedIn) ?`logged in as ${this.state.username}`: "Please Login to Vote :)" }
      </div>
    </div>

   <ul className="list-group list-group-flush">
   {this.state.articles.map(article =>(

    <li key = {article._id}
        className = "list-group-item d-flex justify-content-between align-items-center"
        style = {inlineStyle}
        id ="testOutput"
    >
    {`Title: ${article.title}`} 
    <br />
                   
    {this.ifEmpty(article) ? "There is no Description for that link" : article.content}
    <br />
                  
    {`Tagged: ${article.tag}`}
    <br />

    {`Score: ${article.points}`}
    <br />

     <span
      className="badge badge-danger badge-pill"><a href = {article.link}> here is the link </a></span>

      {this.userObj(this.state.isLoggedIn) 
        ?<span
          className="badge badge-primary badge-pill"
          onClick={() => this.upvote(article._id, article.score)}
          >upvote Article</span>
        :"please login" }
       
      {this.userObj(this.state.isLoggedIn) 
        ?<span
          className="badge badge-primary badge-pill"
          onClick={() => this.downvote(article._id, article.score)}
          >upvote Article</span>
        :"" }

    </li>

   ))}

   </ul>


  </div>
   
  );
  
}




 }



 
 export default mathPage;
 



 //passport local mongoose