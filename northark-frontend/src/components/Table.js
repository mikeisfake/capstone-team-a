import React from 'react';
import config from '../config'
import { useState, useEffect, useContext } from 'react';
import { UserContext, TransactionsContext } from '../contexts/UserContext';
//config.js stores the heroku URL

/*
When replacing the fake data, could do something like this from Transaction.js:

    let [transactionsData, setTransactionsData] = useState("")
    const { user } = useContext(UserContext);
  
    useEffect(()=>{
      fetchTransactions(user.id, 1, "default")
      .then(value=>setTransactionsData((value)))
  
      //Needs error handling.
      //Simple example arguments for now. 1 and "default" correspond to account number and sort type.  
    
    
    },[])


*/


// const DataForTable = () => {
//   // let [tablesData, setTablesData] = useState("")
//   // const { user } = useContext(UserContext);

//   useEffect(() => {
//     //  fetchTables(`${config.API_ENDPOINT}/tables`)
//     //   .then(value => setTablesData((value)))
//     //   .then((res) => {
//     //     if (!res.ok) return res.json().then(e => Promise.reject(e));
//     //     return res.json();
//     //   })
//     //   .then((tables) => {
//     //     this.setState({ tables });
//     //   })
//     //   .catch(error => {
//     //     console.error({ error });
//     //   });
//   })
// }

// TEMPORARY, USE TO PASS FAKE DATA
const DataForTable = () => {

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
      /* The data excluded by adding [0] and .Accounts to the fetch can be found in UserState.*/
    }
  }

  
  useEffect (()=>{

    fetchTransactions()

  }, [])


  const data = [
    {
      id: 1,
      date: '06/10/21',
      transaction: 'ACH Payroll',
      credit: 5000,
      debit: 0,
      balance: 5000.00
    },
    {
      id: 2,
      date: '06/11/21',
      transaction: 'Laptop',
      credit: 0,
      debit: 1499.00,
      balance: 3501.00
    },
    {
      id: 3,
      date: '06/14/21',
      transaction: 'McDonald',
      credit: 0,
      debit: 25.30,
      balance: 3475.70
    },
    {
      id: 4,
      date: '06/15/21',
      transaction: 'NetFlix',
      credit: 0,
      debit: 15.00,
      balance: 3460.70
    }
  ]


  if (transactions){
    return(
    <Table data={transactions[0].Transactions} />
    )
  }

  return (
    <div>Loading transactions....
    </div>
  )


}


/*
        <td>{balance.toFixed(2)}</td>
*/

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


    return (
      <tr key={id}>
        <td>{createdAt}</td>
        <td>{TransactionDescription}</td>
        <td className="Profit">{credit}</td>
        <td className="Expense">{debit}</td>
        <td>{balance}</td>
      </tr>
    )
  })


  /*
  Table container and Reports container classes should be moved outside 
  once we have components actually calling table.

  */

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

/*
  USE THIS WITH THE REAL DATA
  export default Table;
*/

// TEMPORARY
export default DataForTable;