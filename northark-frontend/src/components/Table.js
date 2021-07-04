import React from 'react';
import './Table.css';

// TEMPORARY, USE TO PASS FAKE DATA
const DataForTable = () => {
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
  return (
    <Table data={data}/>
  )
}

const Table = (props) => {

  const data = props.data.map((transactions) => {
    const { id, date, transaction, credit, debit, balance } = transactions

    return (
       <tr key={id}>
          <td>{date}</td>
          <td>{transaction}</td>
          <td>{credit}</td>
          <td>{debit}</td>
          <td>{balance.toFixed(2)}</td>
       </tr>
    )
  })

  return (
    <div>
      <h1 id='title'>Transaction Table</h1>
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
  )
}

/*
  USE THIS WITH THE REAL DATA
  export default Table;
*/

// TEMPORARY
export default DataForTable;