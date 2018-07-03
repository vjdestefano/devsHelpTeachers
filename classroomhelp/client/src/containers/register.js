import React, {Component} from "react";
import API from "../utilities/API";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class register extends Component {

state = {
  user:'',
  password:'',
  password2:'',
  loggedIn: false,
}
 

handleChange = event => {
  // Getting the value and name of the input which triggered the change
  let value = event.target.value;
  const name = event.target.name;

  if (name === "password" || name === 'password2') {
    value = value.substring(0, 15);
  }
  // Updating the input's state
  this.setState({
    [name]: value
  });
};


register(event){
  event.preventDefault();
    if (this.state.password === !this.state.password2) {
      alert("make sure your passwords match!");
    } else if ((this.state.password.length || this.state.password2.length )< 6) {
      alert(
        `Choose a more secure password ${this.state.user}`
      );
    } else {
      API.registerNewUser({
        email: this.state.user, password: this.state.password
      })
    }

    this.setState({
      user: "",
      password2: "",
      password: "",
      loggedIn: true,
    });

  
  
  
}





render(){

  return(
  <div>
    <form>
    Email:<br />
    <input type="text" name="user" value= {this.state.user} onChange = {this.handleChange} />
  <br />
    Password:<br />
  <input type="text" name="password" value={this.state.password} onChange = {this.handleChange} />
  <br />

    Re-enter Password:<br />
  <input type="text" name="password2" value={this.state.password2} onChange = {this.handleChange} />
  <br />
  
  <input type="submit" value="Submit" onSubmit = {this.register} />

    </form>
  </div>
  )
}


 }


 export default register;