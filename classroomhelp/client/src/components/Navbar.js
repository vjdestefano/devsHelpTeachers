import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import API from "../utilities/API"




class Navbar extends Component {

  
  state = {
    articles: [],
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
};


//when mousing over a DOM element the background color changes
changeActiveColor = (e) =>{

  //grabs the element from the DOM with that specific tag, which is being affected
  const { style } = e.target;
  console.log( style );
  //changes the color of the within that object 
  style.backgroundColor = "#424242";
  
 
  
}

changeDeactive = (e) =>{
  const { style } = e.target;
  console.log( style );
  style.backgroundColor = "#f57c00";
  
}


  

render(){


    return(


      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/" onMouseEnter = {this.changeDeactive} onMouseLeave = {this.changeActiveColor}>Devs Helping Teachers</NavLink>
        <NavLink className="navbar nav-pills" to="/login" onMouseEnter = {this.changeDeactive} onMouseLeave = {this.changeActiveColor}>Login</NavLink>
        <NavLink className="navbar nav-pills" to="/register" onMouseEnter = {this.changeDeactive} onMouseLeave = {this.changeActiveColor}>Register</NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
          </ul>
        </div >  
      </nav>

    )



  }  
}

export default Navbar;