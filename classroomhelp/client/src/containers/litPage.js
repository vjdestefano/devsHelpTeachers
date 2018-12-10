import React, {Component} from "react";
import Velocity from "velocity-animate";
import API from "../utilities/API";
import VoteSys from "../utilities/VoteSys";

import "../style/mainpage.css"


class litPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      searchBarView: "",
      open: false,
      username:"",
      isLoggedIn: false,
      beenReloaded: false,
      refresh:"",
      dataType:"",
      
      };
    }

componentDidMount(){
 
 this.loginCheck();
 this.loadLinks();
};

loginCheck = () => {
  API
    .loginCheck()
    .then(res =>{

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

handleOnChange = event => {
  const { name, value } = event.target;

  this.setState({
    [name]: value
  });
};

loadLinks = e => {
  API.literacyLinks().then(res => {

    this.setState({
      articles: res.data,
      dataType: res.data[0].tag
    })
  })
  .catch(err => console.log(err))
}

ifEmpty = obj =>{
  if(!obj){
    
  }
  else{
    if(obj.content.length === 0){
    return true
  } 
  return false; 
}
}

userObj = (obj) =>{
  if(obj){
    
    return true;
  } else{
  
    return false;
  }
};

filterList = event => {
  event.preventDefault();

    //gets the value from the text box, for easy debugging and saving the value for comparison
    const { value } = event.target;
   
    //saves a copy of the state to allow for a filter to be applied
    let list  = this.state.articles;
    
    //where we are going to throw our returns into
    let result = [];
    let prevState = [];

    //this begins the process for somebody typing and trying to filter
    list.filter((item) => {

      //saves a reference of the item.title so its easy to call back to 
      let itemTitle = item.title.toLowerCase();
      //checking if item.title contains the value of search
      if(itemTitle.includes(value)){
      //pushes the value into an array where it gets closer to the users interest
       return result.push(item)
       
      }
      else {
        //any value that does not contain the search value is pushed into here
         return prevState.push(item);
      }
    })
    //concating the array, to allow for minimal to no data loss
    this.setState({ articles: result.concat(prevState) });
};

animElement = (element) =>{

    
  Velocity(element, { 
   opacity:0 ,
   width:  [ "100px", [ 1120, 5 ] ],
   height: 35,
   color: "#ff0000",
  
   },{
     duration: 500,
     display: "none",
     easing: "ease-out",
  });
 
}

hideElement = (element) =>{
  Velocity(element, {
    opacity:0
  },
  {
    duration: 500,
    display: 'none',
  })
}

saveToUser = (username, linkId) =>{

  API.saveTo({username: username, id: linkId}).then(res =>{
   
  })
}

checkIfVoted(username, id){

  // let indexDepth2 = index;
  let linkId = id;

  return API.getUser({username: username}).then(res =>{

    let savedHelpers = res.data.savedHelpers;

    let searchHelper = savedHelpers.includes(id);

    if(searchHelper){
      return true;
    } else {
     
      this.saveToUser(res.data.username, linkId);
      return false;
      
    }
          
  })
}

async upvote(id, index, username) {
  
  const upvoted = this.state.articles.find(article => (article._id === id));

  let isVoted = await this.checkIfVoted(username, upvoted._id);

  if(isVoted === false){

    let grabScore = upvoted.points;
    grabScore++;

    let element = document.getElementById(`upSpan-${index}`);
    let otherElement = document.getElementById(`downSpan-${index}`);

    this.animElement(element);
    this.hideElement(otherElement);
   
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
  } else {
  
  }
}


async downvote (id, index, username) {
  const downVoted = this.state.articles.find(article => (article._id === id));
  
  let isVoted = await this.checkIfVoted(username, downVoted._id);

  if(isVoted === false){

    let grabScore = downVoted.points;
    grabScore--;

    let element = document.getElementById(`downSpan-${index}`);
    let otherElement =  document.getElementById(`upSpan-${index}`);

    this.animElement(element);
    this.hideElement(otherElement);
   
    API.votePositive({
      _id: downVoted._id,
      title: downVoted.title,
      link: downVoted.link,
      points: grabScore,
    })
    .then(res => {
      
        this.loadLinks();
    }
    )
    .catch(err => console.log(err));
  } else {
   
  }
}




render(){

  const inlineStyle = {
    backgroundColor: "#343a40",
    color: "#f8fcfe",
    borderColor: "#f57c00",
  };

  return(

    <div className = "container-fluid">
    <div className = "row" id = "userSection">
      <div className = 'col-12 d-flex justify-content-center'>
      {this.userObj(this.state.isLoggedIn) ?`logged in as ${this.state.username}`: "Please Login to Vote :)" }
      </div>
    </div>
    <div className = "col-sm-6">
    <form className="form">
            <input
              className="form-control mr-sm-8"
              type="text"
              placeholder="Search"
              onChange={this.filterList}
              style={{ visibility: this.state.searchBarView }}
            />
          </form>
    </div>

   <ul className="list-group list-group-flush">
   {this.state.articles.map((article, index) =>(

    //when using the map function the user must have a "key" tag or else it won't work
    <li key = {article._id}
        className = "list-group-item"
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
      <div className = "col-12 linkSection">
      <span
     className="badge badge-danger badge-pill"><a id ="spanTag"
      href = {article.link}
      target="_blank"
      rel="noopener noreferrer"
      > Link to Site</a></span>

      {this.userObj(this.state.isLoggedIn) 
        ?<span
        className="badge badge-primary badge-pill"
        id = {`upSpan-${index}`}
        onClick={() => VoteSys.upvote(article._id, index, this.state.username, this.state.articles)}
          >upvote Article</span>
        :"please login" }
       
      {this.userObj(this.state.isLoggedIn) 
        ?<span
        className="badge badge-primary badge-pill"
        id = {`downSpan-${index}`}
        onClick={() => VoteSys.downvote(article._id, index, this.state.username, this.state.articles)}
          >Downvote Article</span>
        :"" }


      </div>

    
    </li>

   ))}

   </ul>


  </div>
   
  );
  
}




 }



 
 export default litPage;
 

