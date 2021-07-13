import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';

import { UserContext } from './contexts/UserContext'

import './styles/index.scss';



function App() {
  const [trans, setTrans] = useState([]);
  const [userState, setUserState] = useContext(UserContext);
  useEffect (()=>{
    const token = localStorage.getItem('JWT');
    const fetchAccounts =  async () =>{
      const response = await fetch('https://pristine-yosemite-12350.herokuapp.com/users/findaccountsbycustomer', {
          headers: {Authorization: "JWT " + token},
          },);
      if (response.status !== 200) {
            setUserState(userState=> ({...userState, loggedin: false, name: '', customerId:'', phone:'', email:''}));
      } else {
          const data = await response.json();
          setUserState(userState=> ({...userState, 
            loggedin: true, 
            name: data.accounts[0].name, 
            customerId:data.accounts[0].id, 
            phone:data.accounts[0].phone, 
            email:data.accounts[0].email,
            accounts: data.accounts[0].Accounts
          }));
      }
      
      };
      fetchAccounts()
  }, [userState.loggedin])

  const fetchTransactions = async () => {
    const token = localStorage.getItem('JWT');
    const res = await fetch('https://pristine-yosemite-12350.herokuapp.com/users/findtransbycustomer', {
      headers: {Authorization: "JWT " + token},
    });
    if (res.status !== 200){
      setTrans([])
    } else {
      const data = await res.json();
      setTrans(data.trans)
    }
    console.log(trans)    
  }


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
    
  

  return (
      <div className="App">

        <Router>

          <Switch>
            <Route exact path='/' />
            <Route exact path='/' />
            <Route exact path='/' />
            <Route exact path='/' />
          </Switch>
        </Router>

         <Login />
         {userState.loggedin? accountsList: ''}
         <button onClick={fetchTransactions}>get transactions</button>
      </div>

  );
}

export default App;
