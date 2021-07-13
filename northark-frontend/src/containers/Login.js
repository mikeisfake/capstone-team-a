import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'
// import axios from 'axios'

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

  // const handleLogin = async () => {
  //   const { email, password } = inputValue;
  //   try {
  //     const response = await axios.post('https://pristine-yosemite-12350.herokuapp.com/users/login', 
  //     {email,password} 
  //     )
  //     localStorage.setItem('JWT', response.data.token);
  //     setUserState(userState=>({...userState, loggedin: true}))
  //     setInputValue(initialValue);
  //     setError('')
  //   } catch (error){
  //       console.error(error.response.data)
  //       if (error.response.data==='this email not exist' || error.response.data==='passwords do not match') {
  //           setError(error.response.data);
  //       }
  //   }
  // }

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    setUserState(userState=>({...userState, loggedin: false}))
  }

  if (!userState.loggedin) {
    return(
      <div id="login">
          <input
            type="text"
            placeholder="email"
            name = 'email'
            value={inputValue.email}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="password"
            name='password'
            value={inputValue.password}
            onChange={handleInput}
          />
          {/* <button onClick={handleLogin}>login</button> */}
          {error? error: ''}
        </div>
    )
  }
  return (
    <div>
    Welcome, {userState.name}<button onClick={handleLogout}>Log Out</button>
    <hr />
    </div>
    
  )
  
}

export default Login
