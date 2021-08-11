import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import axios from 'axios'

const Login = () => {

  
  const initialValue = {email:'', password:''};
  const [inputValue, setInputValue] = useState(initialValue);
  const [error, setError] = useState('')

  const [userState, setUserState] = useContext(UserContext);


  const fetchAccounts =  async () =>{
    const token = localStorage.getItem('JWT');
    const response = await fetch('https://pristine-yosemite-12350.herokuapp.com/users/findaccountsbycustomer', {
        headers: {Authorization: "JWT " + token},
        },);
    if (response.status !== 200) {
          setUserState(userState=> ({...userState, loggedin: false, name: '', customerId:'', phone:'', email:''}));
          localStorage.removeItem('JWT');
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
        setInputValue(initialValue);
        setError('')
    }
    };




  
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

        fetchAccounts()

    } catch (error){
        console.error(error.response.data)
        if (error.response.data==='this email not exist' || error.response.data==='passwords do not match') {
            setError(error.response.data);
        }
    }
  }

  
  useEffect (()=>{


    fetchAccounts()

  }, [])




  /*
If this component gets more complicated, it would be best to split it into two components.
One component for login logic that calls the login form, and the other that runs the login form
based on some props passed to it(like handleLogin).

But for now, that would be a bit overkill.
  */


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


}

export default Login
