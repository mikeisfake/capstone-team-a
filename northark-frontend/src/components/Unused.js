import { useContext } from 'react'
import { UserContext } from '../contexts/Contexts'
import React, { useEffect, useState } from 'react';
import config from '../config';

  /*
Todo for Yuri/Xiang:
Be aware: Transaction component is for Cesar to handle. Currently Transaction is not rendered, 
instead the Table component in Table.js(with fake data supplied) is being directly rendered at the moment, which will change.

-Change the fetch URL to the heroku URL.
-Adjust how queries are added to the url, based on argument. 
-Adjust any remaining json data parsing needed.
-Add error catching, return error message if not 200.
-For now, no sorting. I just left example code in case.


  */


  // export const Transaction = props => {

  //   /*
  //   Context API(ie, user.id below) worked last time Jeffrey checked it(july 5, 4pm PST). But double check if things change.
  //   */


  //   let [transactionsData, setTransactionsData] = useState("")
  //   const { user } = useContext(UserContext);
  
  //   useEffect(()=>{
  //     fetchTransactions(user.id, 1, "default")
  //     .then(value=>setTransactionsData((value)))
  
      /*
      Simple example arguments for now. 1 and "default" correspond to account number and sort type.  
      Needs error handling.
  
      Then in the render, 
      you would map over {transactionsData}, probably. Or convert it in some way, if needed.
      You cant render {transactinosData} raw by itself, it is an object so React wont render it.
      So it will need to be turned into something else first, which IIRC map does.
      
      */
  
  
    
    
    // },[])
    
    
  
  //   return (
  //     // not sure how to format these but I hate working with tables so maybe a list??
  //     // this would be the component for the individual transaction item. Ideally pull transactions from DB and map over them to make this compoennt for each one and pass data as props to this.
  //     <li className="transaction-item">temporary text{user.id}</li>
  //   )
  // }

//I never learned React Hooks (T.T) but this the way I normally do to fetch data from backend
  const Transaction = () => {
    let [transactionsData, setTransactionsData] = useState("")
    const { userID } = useContext(UserContext);
  
    useEffect(() => {
      fetchTransactions(`${config.API_ENDPOINT}/userID/transactions`)
        .then(value => setTransactionsData((value)))
        .then((res) => {
          if (!res.ok) return res.json().then(e => Promise.reject(e));
          return res.json();
        })
        .then((transactions) => {
          this.setState({ transactions });
        })
        .catch(error => {
          console.error({ error });
        });
    })
  }


async function fetchTransactions(userID, account, sort){


  /*
  This is an example for how the sort function may work in the future. 
  Unused for now.
  If we do this, will have to decide the sorts, their string names, make sure we have the API commands right, etc.
  The sort should probably be placed in a separate function, leaving here as a quick example
  since the sort argument needs to be passed to this function.
  */


  let sortCommand

  switch (sort){
    case 'Price-Descending':
      sortCommand='sort_by=price&order=desc'
      break;
    case 'Price-Ascending':
      sortCommand='sort_by=price&order=asc'
      break;
    default:
      break;
  }


  // let response = await fetch('https://localhost:8000/'+userID)
  //replaced localhost with heroku URL stored in config.js
  let response = await fetch(`${config.API_ENDPOINT}/`+userID)

  let result = await response.json();


  /*
  Returning a specific account of that userID, so that the tables can show that account's data.
  */
  return result.account;

}

