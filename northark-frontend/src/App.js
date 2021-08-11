import { useContext, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import SectionFlow from './components/SectionFlow';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';

import { UserContext, TransactionsContext, SectionContext } from './contexts/Contexts'

import './styles/index.scss';



function App() {
  const [transactions, setTransactions] = useContext(TransactionsContext);
  const [userState, setUserState] = useContext(UserContext);
  const [sectionState, setSectionState] = useContext(SectionContext)



  let items = userState.accounts;
  let accountsList = items.map((item)=>{
    return(
      <div key={item.id}>
        <div>account_number: {item.account_number}</div>
        <div>current_balance: {item.current_balance}</div>
        <div>available_credit: {item.available_credit}</div>
        <div>available_balance: {item.available_balance}</div>
        <div>createdAt: {item.createdAt}</div>
        <div>account_type: {item.AccountType.description}</div>
        <hr/>
      </div>
    )
  })
    
  


  const handleLogout = () => {
    localStorage.removeItem('JWT');
    setUserState(userState=>({...userState, loggedin: false, accounts:[]}))
    setSectionState("Home")
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
