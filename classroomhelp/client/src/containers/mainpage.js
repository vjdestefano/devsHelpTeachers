import React, {Component} from "react";
import API from "../utilities/API";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Collapse from 'react-bootstrap/lib/Collapse';

class testButton extends Component { 


  state = {
    articles: [],
    q: "",
    begin_date: "",
    end_date: "",
    open: false,
  }
 

  handleOnChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  articleSearch = event => {
    event.preventDefault();
    API.getAllArt({
     
    }).then(res => {
      console.log(res.data);
      this.setState({
        articles: res.data.response,
        q: ""
      })
    })
    .catch(err => console.log(err))
  }


  getUser = event => {
    event.preventDefault();

  }


  render(){

    const variableStats = {
      timeout: 500000
    }

   



    return(
    
    <div className = 'container-fluid'>
    

      <div className = 'row'>
        <div className = 'col-sm-2'>
          <ul>
          <li  style= {{listStyleType:"none"}}><button  className = 'btn col-sm-12' onClick={() => this.setState({ open: !this.state.open })}>
              click
              </button>
            <Collapse in={this.state.open} timeout = {variableStats.timeout}>
            <div>
              <p>This will be reference points for the user</p>
            </div>
            </Collapse></li>
            
          </ul>
          
          
            </div>
        

        <div className = 'col-md-8' id = 'introMain'>
      <p> 
        
        Welcome to Teacher's Wish List, a place for all of your needs. Here we have ways for teachers to help
        students accomplish goals and to improve a students experience with their learning career.
        
      </p>
        </div>
      </div>

      <div className = 'col-5'>
      <h3 style = {{textDecoration: "underline"}} > Resources for:</h3>
        <ul>
          <li>PORR - </li>

          <li>CST - </li>

          <li>IEP - </li>

          <li>PT - </li>

          <li>OT - </li>

          <li>Irns - </li>

          <li>Inclusion - </li>
        </ul>

        <p> list some resources to help diagnose children with disabilites. </p>

      </div>
      <div className = 'col-md-6'>

      </div>
      
      
      
      <button type="button" className="btn btn-danger" onClick = {this.articleSearch} >get response</button>
      <button type="button" className="btn btn-secondary" onClick = {this.articleSearch} >get response</button>
      
      </div>
    )
  }

};

export default testButton;
