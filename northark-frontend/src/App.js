import { useContext, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import SectionFlow from './components/SectionFlow';
import Login from './containers/Login';
import { UserContext, TransactionsContext, SectionContext } from './contexts/Contexts'
import './styles/index.scss';



function App() {
  const [transactions, setTransactions] = useContext(TransactionsContext);
  const [userState, setUserState] = useContext(UserContext);
  const [sectionState, setSectionState] = useContext(SectionContext)




  const handleLogout = () => {
    localStorage.removeItem('JWT');

    setUserState(userState=>({...userState, loggedin: false, accounts:[]}))
    setSectionState("Home")
    
    /* For now, handled here rather than in contexts.js due to the use of multiple different contexts at once, 
    and it is a simple function currently */
  }



  useEffect (()=>{

    if (!userState.loggedin){
      setTransactions("")
  }

  }, [userState.loggedin])



  return (
      <div className="App">
        <NavBar handleLogout={handleLogout}/>
        <SectionFlow/>
      </div>
  );
}

export default App;
