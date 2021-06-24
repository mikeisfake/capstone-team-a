import { useState, useEffect } from 'react';

import AccountList from '../components/AccountList';
import Transaction from '../components/Transaction'

const Dashboard = () => {

  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])

  const getTransactions = async () => {
    let res = await fetch('')
    let data = await res.json()
  }

  useEffect(getTransactions(), [])

  return (
    <div id="dashboard">
      <div className="transactions">
        { transactions }
      </div>
    </div>
  )

}

export default Dashboard
