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
      <form className="form-inline">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
)

export default Navbar;