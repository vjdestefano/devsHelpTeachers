import React, {Component} from "react";
import Velocity from "velocity-animate";
import API from "../utilities/API";
import "../style/mainpage.css";
import VoteSys from "../utilities/VoteSys";

class mathPage extends Component {

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
 this.loadLinks();
 this.loginCheck();
};




//shoots a API call to the database to check if there is user
loginCheck = () => {
  API
    .loginCheck()
    .then(res =>{
     
      //if it worked it set the state as bool isLoggedIn and the username from the database
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
  //creates an object with the data from location of the change
  const { name, value } = event.target;
  //sets state as an array with the value
  this.setState({
    [name]: value
  });
};


// this is API call to the database to grab all the links with the "math" tag
loadLinks(){
  API.mathLinks().then(res => {
  
    this.setState({
      articles: res.data,
      dataType: res.data[0].tag
    })
  })
  .catch(err => console.log(err))
};

// is used by the conditional rendering to check if database call has anything within "content" section
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

// another conditional rendering function to check if the obj that is passed in contains something or not
userObj = (obj) =>{
  if(obj){
    return true;
  } else{
    return false;
  }
};

// calls to the Velocity package to animte the element that is passed in
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

// this is used to hide the elements after someone has voted on a particular element
hideElement = (element) =>{
  Velocity(element, {
    opacity:0
  },
  {
    duration: 500,
    display: 'none',
  })
}




// uses the save to function to push a linkId into the array that is assocaited with the username
saveToUser = (username, linkId) =>{
  
  API.saveTo({username: username, id: linkId}).then(res =>{
    
  })
}

checkIfVoted(username, id){

  //taking a snapshot of the id incase anything happens to the id during data manipualtion
  let linkId = id;

  return API.getUser({username: username}).then(res =>{

    //saves the array assocated with the username
    let savedHelpers = res.data.savedHelpers;
    //returns true or false to see if the array includes the ID of the voted on item
    let searchHelper = savedHelpers.includes(id);

    if(searchHelper){
      return true;
    } else {
     //calls the saveTo function to allow to push the data to the users array in the database
      this.saveToUser(res.data.username, linkId);
      return false;
      
    }
          
  })
}



//TOOL FOR THE TOOLBELT!
async upvote(id, index, username) {
  
  const upvoted = this.state.articles.find(article => (article._id === id));

  //allows the action to wait until check if voted is true or false
  let isVoted = await this.checkIfVoted(username, upvoted._id);

  if(isVoted === false){

    // grabs the current score of an item and increases it
    let grabScore = upvoted.points;
    grabScore++;

    //can only grab a span tag by the ID
    //so i created a way to make each one of the span tags have an ID unique to its index
    let element = document.getElementById(`upSpan-${index}`);
    let otherElement = document.getElementById(`downSpan-${index}`);

    this.animElement(element);
    this.hideElement(otherElement);
  //  pushes that score the the database to be saved and updated
    API.votePositive({
      _id: upvoted._id,
      title: upvoted.title,
      link: upvoted.link,
      points: grabScore,
    })
    .then(res => {
      // resets the state to allow for on-the-fly changes/updating
      this.loadLinks();
    }
    )
    .catch(err => console.log(err));
  } else {
   
  }
}

//see notes for 
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

  //just like the variables say, used for inline styling for testing
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

 export default mathPage;
 

