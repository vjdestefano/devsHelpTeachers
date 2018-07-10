import React, {Component} from "react";
import API from "../utilities/API";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class mathPage extends Component {

state = {
  articles:[],
  scrapeData:'',

}

componentDidMount(){
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




render(){

  const inlineStyle = {
    backgroundColor: "black",
    color: "white",
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
                   
    {this.ifEmpty(article) ? "There is no Description for that link" : article.content}
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



 
 export default mathPage;
 



 //passport local mongoose