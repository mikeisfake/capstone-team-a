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


  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider, TransactionsContext, TransactionsContextProvider, SectionContext, SectionContextProvider }
