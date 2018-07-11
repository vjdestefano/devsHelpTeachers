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

  upvote = (id, score) => {
    const upvoted = this.state.articles.find(article => (article._id === id));
    let grabScore = upvoted.score;

    console.log(grabScore);
    grabScore++;
    console.log(grabScore);
   
   
    API.votePositive({
      _id: upvoted._id,
      title: upvoted.title,
      link: upvoted.link,
      score: grabScore,
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

    let string;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <ul>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="btn col-sm-12"
                  onClick={() => this.setState({ open: !this.state.open })}
                >
                  click
                </button>
                <Collapse in={this.state.open} timeout={variableStats.timeout}>
                  
                  <div>
                    <p>This will be reference points for the user</p>
                  </div>
                </Collapse>

              </li>
            </ul>
          </div>

          <div className="col-md-8" id="introMain">
            <p>
              Welcome to Teacher's Wish List, a place for all of your needs.
              Here we have ways for teachers to help students accomplish goals
              and to improve a students experience with their learning career.
            </p>
          </div>
        </div>

        <div className="col-5">
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

          <p>
            {" "}
            list some resources to help diagnose children with disabilites.{" "}
          </p>
        </div>
        <div className="col-md-8">
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
                   
                  {this.ifEmpty(article) ? "There is no Description for that link" : article.content}
                  <br />
                  
                  {`Tagged: ${article.tag}`}
                  <br />
                  {`Score: ${article.score}`}
                  <br />
                  <span
                    className="badge badge-danger badge-pill"><a id ="spanTag" href = {article.link}> here is the link </a></span>
                  <span
                        className="badge badge-primary badge-pill"
                        onClick={() => this.upvote(article._id, article.score)}>upvote Article</span>
                </li>
              ))}
            </ul>
          </form>
        </div>

       
        <Link  type = "button" className = "btn btn-danger" to="/mathresources">MATH?</Link>

        <Link  type = "button" className = "btn btn-success" to="/litresources">MATH?</Link>
        
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.literacySearch}
        >
          get Wiki Literacy Links
        </button>
      </div>
    );
  }
}

export default testButton;
