import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'

import AccountList from '../components/AccountList';
import Transaction from '../components/Transaction'

const Dashboard = () => {

  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])

  const { user, logout } = useContext(UserContext);

  const getTransactions = async () => {
    let res = await fetch('')
    let data = await res.json()
  }

  // useEffect(getTransactions(), [])

  return (
    <div id="dashboard">
      <h1>{user.name}'s Accounts Dashboard</h1>
      <button onClick={logout}>logout</button>
    </div>
  )

}

export default Dashboard
