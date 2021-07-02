import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import React, { useEffect, useState } from 'react';

  /*
  Todo for fetch and the useeffect for it:
  May need to adjust the fetch based on what the backend API expects. I tried to match it to the latest backend files.
  Useeffect will probably need context.userID passed as the first argument. Cesar can add that once context is implemented.

  
  Sort switch is just an example for now.
  */



export const Transaction = props => {


  let [transactionsData, setTransactionsData] = useState("")
  const { user } = useContext(UserContext);

  useEffect(()=>{
    fetchTransactions(user.id, 1, "default")
    .then(value=>setTransactionsData((value)))

    /*
    Simple example arguments for now. 1 and "default" correspond to account number and sort type.
    Once the parent component wraps this component in context and the context is imported here,
    you would probably put something like context.userID for the userID argument of fetchTransactions. 


    Then in the render, 
    you would map over {transactionsData}, probably. Or convert it in some way, if needed.
    You cant render {transactinosData} raw by itself, it is an object so React wont render it.
    So it will need to be turned into something else first, which IIRC map does.
    
    */


  
  
  },[])
  
  

  return (
    // not sure how to format these but I hate working with tables so maybe a list??
    // this would be the component for the individual transaction item. Ideally pull transactions from DB and map over them to make this compoennt for each one and pass data as props to this.
    <li className="transaction-item">temporary text</li>
  )
}




async function fetchTransactions(userID, account, sort){


  /*
  This is an example for how the search function may work in the future. 
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

  /*
  Not tested, and backend is apparently in flux, so you may need to talk to Yuri/Xiang about proper syntax.
  May have to convert the userID prop to a string or something.
  The port may not be correct.
  */
  let response = await fetch('https://localhost:8000/'+userID)


  let result = await response.json();

  /*
  Returning a specific account of that userID.
  */
  return result.account;

}

