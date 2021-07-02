import { createContext, useState } from 'react'

export const UserContext = createContext()

function UserContextProvider (props) {
  const [user, setUser] = useState(null);
  const values = {user, login, logout};

  function login () {
    setUser('bob')
  }

  function logout () {
    setUser(null)
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
