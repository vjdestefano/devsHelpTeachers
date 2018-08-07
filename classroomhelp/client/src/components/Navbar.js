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

changeActiveColor = (e) =>{
  const { style } = e.target;
  console.log( style );
  style.backgroundColor = "#424242";
  
  
 
  
}

changeDeactive = (e) =>{
  const { style } = e.target;
  console.log( style );
  style.backgroundColor = "#f57c00";
  
}


  

render(){

  // const inlineStyle = {
  //   backgroundColor: "#424242",
  //   color: "#0288d1",
  //   borderColor: "#f57c00",
  // };



    return(


      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/" onMouseEnter = {this.changeDeactive} onMouseLeave = {this.changeActiveColor}>Devs Helping Teachers</NavLink>
        <NavLink className="navbar nav-pills" to="/login" onMouseLeave = {this.changeActiveColor}>Login</NavLink>
        <NavLink className="navbar nav-pills" to="/register">Register</NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            {/* <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li> */}
      </ul>
    </div >  
  </nav>

    )



  }  
}

export default Navbar;