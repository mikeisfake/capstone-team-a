import { NavBar } from './NavBar';
import { useContext } from 'react'
import { UserContextProvider } from '../contexts/UserContext';

const Layout = ({ children }) => {

  //we should have a function to check if logged in here maybe?

  return (
    <UserContextProvider>
      <div id="layout">
        <NavBar />
        { children }
        <footer>
        </footer>
      </div>
    </UserContextProvider>
  )
}
export default Layout

// this component wraps around the App component to endure it is displayed on all pages. We will want to have some conditional logic/control flow here regarding login status. As in there should be a button here to allow a user to login, but if they are already logged in that button should not display. That may end up being a job for the NavBar component??
