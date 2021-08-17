import React from 'react';
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { UserContext, SectionContext } from '../contexts/Contexts'


export const NavBar = props => {

  const [userState, setUserState] = useContext(UserContext);
  const [sectionState, setSectionState] = useContext(SectionContext)


  return(
      <nav>
        <h1>NorthArk</h1>
        <div className="Navbar-Buttons">
          <button className="Navbar-Button" onClick={()=>{setSectionState("Home")}}>Home</button>
          <button className="Navbar-Button">Settings</button>
          <button className="Navbar-Button" onClick={props.handleLogout}>Log Out</button>
        </div>
      </nav>
  )
}
