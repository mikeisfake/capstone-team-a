import { createContext, useState } from 'react'

const TransactionsContext=createContext();

function TransactionsContextProvider(props) {
  const [transactionsState, setTransactionsState]=useState("")

  return(
    <TransactionsContext.Provider value={[transactionsState, setTransactionsState]}>
      {props.children}
    </TransactionsContext.Provider>
  )
}

const SectionContext=createContext();

function SectionContextProvider(props){
  const [sectionState, setSectionState]=useState("Home")

  return(
    <SectionContext.Provider value={[sectionState, setSectionState]}>
      {props.children}
    </SectionContext.Provider>
  )
}


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

export { UserContext, UserContextProvider, TransactionsContext, TransactionsContextProvider, SectionContext, SectionContextProvider }
