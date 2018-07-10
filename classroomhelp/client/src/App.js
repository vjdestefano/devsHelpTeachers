import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import register from "./containers/register"
import testButton from "./containers/mainpage";
import mathPage from "./containers/mathpage"
import litPage from "./containers/litPage"
import login from "./containers/login"




const App = () => (
  <Router>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={testButton}/>
        <Route exact path = '/register' component = {register} />
        <Route exact path = '/login' component = {login} />
        <Route exact path = "/mathresources" component = {mathPage} />
        <Route exact path = "/litresources" component = {litPage} />
        <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
      </Switch>
    </div>
  </Router>
)


export default App;