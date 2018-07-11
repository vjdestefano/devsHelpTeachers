import React from "react";
import { NavLink } from "react-router-dom";




const Navbar = () => (
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
    </div>
    <div>
    
    
  </div>
  
  </nav>
)

export default Navbar;