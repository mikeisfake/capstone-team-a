import React from 'react';
import config from '../config'
import { useState, useEffect, useContext } from 'react';
import { UserContext, TransactionsContext } from '../contexts/Contexts';
//config.js stores the heroku URL




const Transactions = () => {

  const [transactions, setTransactions] = useContext(TransactionsContext);

  
  const fetchTransactions = async () => {
    const token = localStorage.getItem('JWT');
    const res = await fetch('https://pristine-yosemite-12350.herokuapp.com/users/findtransbycustomer', {
      headers: {Authorization: "JWT " + token},
    });
    if (res.status !== 200){
      setTransactions([])
    } else {
      const data = await res.json();
      console.log(JSON.stringify(data))
      setTransactions(data.trans[0].Accounts)
      /* The data excluded by adding "[0].Accounts" to the fetch can be found in UserState. That specific subsection gets us to the transaction data.
      Data traversal looks like: If you wanted to get account #5's transactions, the code would be: data.trans[0].Accounts.find(x => x.id ===5).Transactions
      This is assuming you're using the fetch above.
      You could also simply do data.trans[0].Accounts.[1].Transactions, where the [1] is just determined by something like "This is this user's second account, so it would be 0".
      */
    }
  }

  
  useEffect (()=>{

    fetchTransactions()

  }, [])




  if (transactions){
    return(
    <Table data={transactions[0].Transactions} />
    )
  }

  /*
  For now, it is just getting the first account's transactions, thus [0].Transactions.
  Account selection should be added later, changing which index is put into [#].
  */


  return (
    <div>Loading transactions....
    </div>
  )


}


const Table = (props) => {

  let balance=0

  const data = props.data.map((transactions) => {
    const { id, createdAt, TransactionType, amount } = transactions
    let credit
    let debit
    let TransactionDescription
    if(TransactionType.description==="deposit"){
      credit=amount
      balance=+credit
      TransactionDescription="Deposit"
    }else{
      debit=amount
      balance=-debit
      TransactionDescription="Withdrawel"
    }

    let dateConverted=new Date(createdAt)
    let date=""+dateConverted.getUTCDate()+"/"+dateConverted.getUTCMonth()+"/"+dateConverted.getUTCFullYear()



    return (
      <tr key={id}>
        <td>{date}</td>
        <td>{TransactionDescription}</td>
        <td className="Profit">{credit}</td>
        <td className="Expense">{debit}</td>
        <td>{balance}</td>
      </tr>
    )
  })



  return (
    <div className="Reports-Container">
      <div className="Accounts-Container">Accounts
        <div><button className="Account">Ark Checkings</button></div>
        <div><button className="Account">Ark Savings</button></div>
      </div>
      <div className="Table-Container">
        <h3 id='title'>Account Title</h3>
        <table id='transactions'>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Balance</th>
            </tr>
            {data}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Transactions;