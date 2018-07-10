import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import register from "./containers/register"
import testButton from "./containers/mainpage";
import mathPage from "./containers/mathpage"




const App = () => (
  <Router>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={testButton}/>
        <Route exact path = '/register' component = {register} />
        <Route exact path = "/mathresources" component = {mathPage} />
        <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
      </Switch>
    </div>
  </Router>
)


export default App;