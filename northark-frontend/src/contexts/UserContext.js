import { createContext, useState } from 'react'

export const UserContext = createContext()

function UserContextProvider (props) {
  const [user, setUser] = useState(null);
  const values = {user, login, logout};

  function login (event) {
    event.preventDefault()
    let fakeUser = {
      id: 1,
      name: 'mike'
    }
    setUser(fakeUser)
    //this function should take some params from the form and do a get to the backend to retireve the user.
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
