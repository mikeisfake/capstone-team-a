import React from 'react'

const NavBar = () => {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to='/'> NorthArk </Link>
          </li>

          <li>
            <Link to='/'> Link 1 </Link>
          </li>

          <li>
            <Link to='/'> Link 2 </Link>
          </li>

          <li>
            <Link to='/'> Link 3 </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default NavBar
