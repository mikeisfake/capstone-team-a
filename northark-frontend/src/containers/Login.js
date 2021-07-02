import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(UserContext);


  //controlled forms so we can use state to send request to backend and retrieve user to populate the account/transactions etc.
  const handleUsername = e => {
    setUsername(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }

  return(
    <div id="login">
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePassword}
        />
        <input
          type="submit"
          value="login"
        />
        </form>
      </div>
  )
}

export default Login
