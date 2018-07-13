import React, { Component } from "react";
import API from "../utilities/API";
import { BrowserRouter as Route, Link} from "react-router-dom";
import Collapse from "react-bootstrap/lib/Collapse";
import "../style/mainpage.css"


class testButton extends Component {

  //articles translates to scrapes
  state = {
    articles: [],
    searchBarView: "hidden",
    open: false,
    username:"",
    isLoggedIn: false,
    beenReloaded: false,
  };

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
        })
      }) 
      .catch(err => {
        console.log("this is an error")
        console.log(err);
        this.setState({isLoggedIn: false})
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
    console.log("im here before API");
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
    event.preventDefault();
    console.log("im here before API");
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

    const { name, value } = event.target;
    console.log(value);
    //gets values from inputs

    let list = this.state.articles;
    //sets the list that is going to be filtered

    let result = [];
    // result = list.filter(a => {
      result = list.filter(a => {
      return a.title.toLowerCase().search(value) != -1;
    });
    this.setState({ articles: result });
  };

  ifEmpty = obj =>{
    if(obj.content.length === 0){
      return true
    } else return false
  }

  userObj = (obj) =>{
    if(obj){
      console.log(this.state.username);
      return true;
    } else{
      console.log("you arent logged in!")
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
    .then(res => console.log(res))
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
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }





  render() {
    const variableStats = {
      timeout: 500000
    };

    const inlineStyle = {
      backgroundColor: "#424242",
      color: "#0288d1",
      borderColor: "#f57c00",
      
    };

   

    return (
      <div className="container-fluid">
      <div className = "row">

      </div>



        <div className="row">

          <div className="offset-2 col-md-8" id="introMain" >
          {this.userObj(this.state.isLoggedIn) ?`logged in as ${this.state.username}`: "Please Login to Vote" }
            <h3>
              Welcome to Teacher's Wish List, a place for all of your needs.
              Here we have ways for teachers to help students accomplish goals
              and to improve a students experience with their learning career.
            </h3>
          </div>
        </div>

        {/* <div className="col-5">
          <h3 style={{ textDecoration: "underline" }}> Resources for:</h3>
          <ul>
            <li>PORR - </li>

            <li>CST - </li>

            <li>IEP - </li>

            <li>PT - </li>

            <li>OT - </li>

            <li>Irns - </li>

            <li>Inclusion - </li>
          </ul>

          
        </div> */}
        <div className="offset-2 col-md-8">
          <form className="form-inline">
            <input
              className="form-control mr-sm-8"
              type="text"
              placeholder="Search"
              onChange={this.filterList}
              style={{ visibility: this.state.searchBarView }}
            />
            <ul className="list-group list-group-flush" >
              {this.state.articles.map(article => (
                <li
                  key={article._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={inlineStyle}
                  id ="testOutput"
                  // onClick = {this.linkClick}
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
                    className="badge badge-danger badge-pill"><a id ="spanTag"
                     href = {article.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     > Link to Site</a></span>
                  <span
                        className="badge badge-primary badge-pill"
                        onClick={() => this.upvote(article._id, article.score)}
                        >upvote Article</span>

                  <span
                        className="badge badge-primary badge-pill"
                        onClick={() => this.downvote(article._id, article.score)}
                        >Downvote Article</span>
                </li>
              ))}
            </ul>
          </form>
        </div>

       
        <Link  type = "button" className = "btn btn-danger col-sm-3" to="/mathresources">Math Links</Link>

        <Link  type = "button" className = "btn btn-success col-sm-3" to="/litresources">Literacy Links</Link>
        
        <button

          type="button"
          className="btn btn-secondary col-sm-3"
          onClick={this.literacySearch}
        >
          get Wiki Literacy Links
        </button>
      </div>
    );
  }
}

export default testButton;
