import React, { Component } from "react";
import API from "../utilities/API";
import {Link} from "react-router-dom";
import Velocity from "velocity-animate";


import "../style/mainpage.css"


class mainpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      searchBarView: "hidden",
      open: false,
      username:"",
      isLoggedIn: false,
      beenReloaded: false,
      refresh:"",
      
      };
    }


  componentDidMount(){
    this.loginCheck();
  }


  loginCheck = () => {
    API
      .loginCheck()
      .then(res =>{
        console.log(res);
        this.setState({
        isLoggedIn: res.data.isLoggedIn, username: res.data.username
        });
        this.props.updatePage(this.state.isLoggedIn, this.state.username)
      }) 
      .catch(err => {
        console.log("this is an error")
        console.log(err);
        this.setState({isLoggedIn: false})

        //make a function that takes in 2 variables, send those variables to app.js then set state there
      })
  }

 


  handleOnChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

 

  articleSearch = event => {
    event.preventDefault();
    API.getAllScrapes()
      .then(res => {
        console.log(res.data);
        this.setState({
          articles: res.data,
          q: "",
          searchBarView: "",
        });
      })
      .catch(err => console.log(err));
  };

  literacySearch = event => {
    if(!event){} else{
      event.preventDefault();
    }
    API.literacyLinks()
      .then(res => {
        console.log(res.data);
        this.setState({
          articles: res.data,
          q: "",
          searchBarView: "",
        });
      })
      .catch(err => console.log(err));
  };

  filterList = event => {
    event.preventDefault();

    const { value } = event.target;
    console.log(value);
    //gets values from inputs

    let list = this.state.articles;
    //sets the list that is going to be filtered

    let result = [];
    // result = list.filter(a => {
      result = list.filter(a => {
      return a.title.toLowerCase().search(value) != -1;
     // return a.title.toLowerCase().search(value) != -1;
    });
    this.setState({ articles: result });
  };

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
    console.log(linkId)
    API.saveTo({username: username, id: linkId}).then(res =>{
      console.log(res.data);
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
        
          this.literacySearch();
      }
      )
      .catch(err => console.log(err));
    } else {
      console.log("you've voted already!")
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
        
          this.literacySearch();
      }
      )
      .catch(err => console.log(err));
    } else {
     
    }
  }


  pageRefresh(){
    if(this.state.refresh === "."){
      this.setState({
        refresh: ""
      })
    } else {
      this.setState({
        refresh: "."
      })
    }
  }



  render() {
  

    const inlineStyle = {
      backgroundColor: "#424242",
      color: "#f8fcfe",
      borderColor: "#f57c00",
      
    };

    

   

    return (
      <div className="container-fluid">
      <div className = "row" id = "userSection">
      <div className = 'col-12 d-flex justify-content-center'>
      {this.userObj(this.state.isLoggedIn) ?`logged in as ${this.state.username}`: "Please Login to Vote :)" }
      </div>
      </div>



        <div className="row">

          <div className=" col-12 d-flex justify-content-center" id="introMain" >
            {/* <img src = "https://i.imgur.com/hNGfx3q.png" style ={{paddingRight: "3%"}}/> */}
            <h3>
              Welcome to Teacher's Wish List, a place for all of your needs.
              Here we have ways for teachers to help students accomplish goals
              and to improve a students experience with their learning career.
            </h3>
          </div>
        </div>

       

        <div className = 'row' id = 'literacyLinks'>
              <div className = 'd-flex justify-content-sm-center col-sm-8' id = "literImage" >
                <img  type= "image"
                src="https://i.imgur.com/Soooqrs.gif"
                width = "250px"
                height = "250px"
                 />

              </div>

              <div className = " introBody col-sm-4 justify-content-sm-center">
              <h4> Literacy Helpers</h4>
              <p> List of a links to sites that specialize in helping young students improve thier literacy
              </p>
              <Link  type = "button" className = "btn btn-success col-sm-12" to="/litresources">Literacy Links</Link>
              </div>


        </div>


        <div className = 'row' id = 'mathLinks'>
            

              <div className = "introBody col-sm-3">
              <h4> Math Helpers</h4>
              <p> Online resources to help young students with math.
              </p>
              <Link  type = "button" className = "btn btn-danger col-sm-12" to="/mathresources">Math Links</Link>
              </div>

              <div className = 'd-flex justify-content-sm-center col-sm-9' id = "mathImage" >
                <img  type= "image"
                src="https://i.imgur.com/66s8VT4.png"
                width = "250px"
                height = "250px"
                 />

              </div>


        </div>

        {this.state.refresh}
        <button

          type="button"
          className="btn btn-secondary col-6"
          onClick={this.literacySearch}
        >
          get Wiki Literacy Links
        </button>


        <div className="col-md-12">
          <form className="form-inline">
            <input
              className="form-control mr-sm-8"
              type="text"
              placeholder="Search"
              onChange={this.filterList}
              style={{ visibility: this.state.searchBarView }}
            />

            {this.state.bullshit}
            <ul className="list-group list-group-flush" >
            
              {this.state.articles.map((article, index) => (
                <li
                  key={article._id}
                  className="list-group-item"
                  style={inlineStyle}
                  id ="testOutput"
                
                >
                  {`Title: ${article.title}`} 
                  <br />
                   
                  {this.ifEmpty(article) ? "No description listed" : article.content}
                  <br />
                  
                  {`Tagged: ${article.tag}`}
                  <br />
                  {`Score: ${article.points}`}
                  <br />
                  <span
                    className="badge badge-danger badge-pill justify-content-end"><a id ="spanTag"
                     href = {article.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     > Link to Site</a></span>
                  <span
                        className= "badge badge-primary badge-pill justify-content-end"
                        id = {`upSpan-${index}`}
                        onClick={() => this.upvote(article._id, index, this.state.username)}
                        >upvote Article</span>

                  <span
                        className="badge badge-primary badge-pill justify-content-end"
                        id = {`downSpan-${index}`}
                        onClick={() => this.downvote(article._id, index, this.state.username)}
                        >Downvote Article</span>
                        
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default mainpage;
