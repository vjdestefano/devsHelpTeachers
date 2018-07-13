import React, {Component} from "react";
import API from "../utilities/API";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class litPage extends Component {

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
    })
};


loadLinks = e => {
  API. literacyLinks().then(res => {
    console.log(res.data);
    this.setState({
      articles: res.data,
      dataType: res.data[0].tag
    })
  })
  .catch(err => console.log(err))
}

ifEmpty = obj =>{
  if(obj.content.length === 0){
    return true
  } else return false
}




render(){

  const inlineStyle = {
    backgroundColor: "#343a40",
    color: "#f8fcfe",
    borderColor: "#f57c00",
  };

  return(

   <div className = "container">
   <ul className="list-group list-group-flush">
   {this.state.articles.map(article =>(

    <li key = {article._id}
        className = "list-group-item d-flex justify-content-between align-items-center"
        style = {inlineStyle}
        id ="testOutput"
    >
    {`Title: ${article.title}`} 
    <br />
                   
    {this.ifEmpty(article) ? "No description listed" : article.content}
    <br />
                  
    {`Tagged: ${article.tag}`}
    <br />

     <span
      className="badge badge-danger badge-pill"><a href = {article.link}> here is the link </a></span>

    </li>

   ))}

   </ul>


  </div>
   
  );
  
}




 }



 
 export default litPage;
 

