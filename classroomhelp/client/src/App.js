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



  // setUser(){

  //   this.set
  // }

  updatePage(){
    console.log("this is the update function")

    this.setState({
      bullshit: true
    })
  }

//component={testButton}
  render(){

    return(
      <Router>
      <div>
        <Navbar refresh = {this.loginCheck} />
        <Switch>
    <Route exact path="/"  render = {() => <Mainpage updatePage = {this.updatePage} /> } />
          <Route exact path = '/register' component = {Register} />
          <Route exact path = '/login' component = {Login} />
          <Route exact path = "/mathresources" component = {MathPage} />
          <Route exact path = "/litresources" component = {LitPage} />
          <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
        </Switch>
      </div>
    </Router>
    )
  }
}
 



export default App;