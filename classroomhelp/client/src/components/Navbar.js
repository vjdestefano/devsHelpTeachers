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
          <NavLink className="nav-link" to="/articles">Something that might interest users</NavLink>
        </li>
      </ul>
    </div>
    <div>
      
    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle"
          type="button" id="dropdownMenu1" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
    <a className="dropdown-item"  to = "/">home</a>
    <a className="dropdown-item" href="/search/findreddit">Another action</a>
  </div>
</div>
    </div>
  </nav>
)

export default Navbar;