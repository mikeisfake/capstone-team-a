import { createContext, useState } from 'react'

const UserContext = createContext([{}, ()=>{}])

function UserContextProvider (props) {
  const [userState, setUserState] = useState({
    loggedin: false,
    customerId: '',
    name: '',
    phone: '',
    email: '',
    accounts: []
  });
  // const [user, setUser] = useState(null);
  // const values = {user, login, logout};

  // function login (event) {
  //   event.preventDefault()
  //   let fakeUser = {
  //     id: 1,
  //     name: 'mike'
  //   }
  //   setUser(fakeUser)
  //   //this function should take some params from the form and do a get to the backend to retireve the user.
  // }

  // function logout () {
  //   setUser(null)
  // }

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
