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

// test(){
//       window.location.reload(true);
// }


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


  

render(){

  const inlineStyle = {
    backgroundColor: "#424242",
    color: "#0288d1",
    borderColor: "#f57c00",
  };



    return(


      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">Devs Helping Teachers</NavLink>
    
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
      </ul>
    </div >


    
    <div style = {{color: inlineStyle.color}} >
    {this.state.isLoggedIn ? `logged in as ${this.state.username}` : `Please login to vote :)` }
  </div>
  
  </nav>

    )



  }  
}

export default Navbar;