import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./containers/register"
import Mainpage from "./containers/mainpage";
import MathPage from "./containers/mathpage"
import LitPage from "./containers/litPage"
import Login from "./containers/login"




class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      usr: '',
    }


    
    this.updatePage = this.updatePage.bind(this);
  }

//this is bound to this document but will be called to check if the user object is detected
  updatePage(isLoggedIn, usr){
       this.setState({
      isLoggedIn: isLoggedIn,
      usr:        usr
    })
  }

//use render to allow data to be passed down from the main object
  render(){

    return(
      <Router>
      <div>
        <Navbar refresh = {this.loginCheck} />
        <Switch>
    <Route exact path="/"  render = {() => <Mainpage updatePage = {this.updatePage} /> } />
          <Route exact path = '/register' component = {Register} />
          <Route exact path = '/login' component = {Login} />
          <Route exact path = "/mathresources" render = {() => <MathPage data = {this.state} /> } />
          <Route exact path = "/litresources" render = {() => <LitPage data = {this.state} /> } />
          <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
        </Switch>
      </div>
    </Router>
    )
  }
}
 



export default App;