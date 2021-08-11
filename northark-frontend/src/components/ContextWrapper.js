import { NavBar } from './NavBar';
import { useContext } from 'react'
import { UserContextProvider, TransactionsContextProvider, SectionContextProvider } from '../contexts/Contexts';

const ContextWrapper = ({ children }) => {


  return (
  <UserContextProvider>
    <SectionContextProvider>
        <TransactionsContextProvider>
            { children }
        </TransactionsContextProvider>
    </SectionContextProvider>
  </UserContextProvider>
  )
}
export default ContextWrapper

// this component wraps around the App component to endure it is displayed on all pages.