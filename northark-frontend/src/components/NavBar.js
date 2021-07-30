import React from 'react';
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { UserContext, SectionContext } from '../contexts/UserContext'


export const NavBar = props => {

  const [userState, setUserState] = useContext(UserContext);
  const [sectionState, setSectionState] = useContext(SectionContext)

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    setUserState(userState=>({...userState, loggedin: false, accounts:[]}))
    setSectionState("Home")
  }


  return(
    <React.Fragment>
      <nav>
          <h1>NorthArk</h1>
      <div className="Navbar-Buttons">
        <button className="Navbar-Button">Example</button>
        <button className="Navbar-Button">Settings</button>
        <button className="Navbar-Button" onClick={handleLogout}>Log Out</button>
      </div>
      </nav>
    </React.Fragment>
  )
}
