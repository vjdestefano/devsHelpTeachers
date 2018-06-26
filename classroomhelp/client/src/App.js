import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import testButton from "./containers/mainpage";



const App = () => (
  <Router>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={testButton}/>
        <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
      </Switch>
    </div>
  </Router>
)


export default App;