import React from 'react';
import { Link } from 'react-router-dom'


export const NavBar = props => {
  return(
    <React.Fragment>
      <nav>
          <h1>NorthArk</h1>
      <div className="Navbar-Buttons">
        <button className="Navbar-Button">Example</button>
        <button className="Navbar-Button">Settings</button>
        <button className="Navbar-Button">Log Out</button>
      </div>
      </nav>
    </React.Fragment>
  )
}
