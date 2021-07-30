import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios'

const Login = () => {

  
  const initialValue = {email:'', password:''};
  const [inputValue, setInputValue] = useState(initialValue);
  const [userState, setUserState] = useContext(UserContext);
  const [error, setError] = useState('')



  
  const handleInput = e => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async () => {
    const { email, password } = inputValue;
    try {
      const response = await axios.post('https://pristine-yosemite-12350.herokuapp.com/users/login', 
      {email,password} 
      )
      localStorage.setItem('JWT', response.data.token);
      setUserState(userState=>({...userState, loggedin: true}))
      setInputValue(initialValue);
      setError('')
    } catch (error){
        console.error(error.response.data)
        if (error.response.data==='this email not exist' || error.response.data==='passwords do not match') {
            setError(error.response.data);
        }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    setUserState(userState=>({...userState, loggedin: false, accounts:[]}))
  }



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

  



    return(
      <div id="login" className="Front-Container">
        <div className="Login-Form">
          <input
            type="text"
            placeholder="email"
            name = 'email'
            value={inputValue.email}
            class="Login-Field"
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="password"
            name='password'
            class="Login-Field"
            value={inputValue.password}
            onChange={handleInput}
          />
          <button className="Login-Submit" onClick={handleLogin}>login</button>
          {error? error: ''}
          </div>
        </div>
    )


    /*
  return (
    <div>
    Welcome, {userState.name}<button onClick={handleLogout}>Log Out</button>
    <hr />
    </div>
    
  )
  */
  
}

export default Login
