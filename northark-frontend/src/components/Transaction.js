

  /*
  Todo for fetch and the useeffect for it:
  Sort switch is just an example for now.
  Will need to adjust the fetch based on what the backend API expects.
  Useeffect will probably need context.user passed as the first argument.
  Misc possible considerations noted below.

  */



export const Transaction = props => {


  let [transactionsData, setTransactionsData] = useState("")

  useEffect(()=>{
    fetchTransactions("user", 1, "default")
    .then(value=>setTransactionsData((value)))

    /*
    Simple example arguments for now.
    Once the parent component wraps this component in context and the context is imported here,
    you would probably put something like context.user for the user argument of fetchTransactions. 
    */

  
  
  },[])
  
  

  return (
    // not sure how to format these but I hate working with tables so maybe a list??
    // this would be the component for the individual transaction item. Ideally pull transactions from DB and map over them to make this compoennt for each one and pass data as props to this.
    <li className="transaction-item"></li>
  )
}




async function fetchTransactions(user, account, sort){



  const sortCommand

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
  The sort should probably be placed in a separate function, leaving here as a quick example
  since the sort argument needs to be passed to this function.

  Example for how the search function may work in the future. 
  Unused for now.
  When we do this, will have to decide the sorts, their string names, make sure we have the API commands right, etc.
  */


  let response = await fetch('https://LOCALHOSTBACKENDURLGOESHERE.com?' + new URLSearchParams({
    username: user,
    accountnumber: account,
  }));

  let result = await response.json();

  /*
  Will need to fill in the proper URL once we have it.

  URLSearchParams is basically just a nice way to add the API query to the URL, unless I misunderstand something. 
  If I did misunderstand something, I can use something else.

  Will have to rewrite the exact arguments of course, based on how the GET function ends up
  working on the backend, but this is a decent example for now.

  May have to convert the user prop to a string or something.

  Would later add "sort: sortCommand," to URLSearchparams.
  */

  return response;

}

/*
The way fetchTransactions would probably be integrated into Transaction, or other components,
would be something like:


let [transactionsData, setTransactionsData] = useState("")

useEffect(()=>{
  fetchTransactions(arguments)
  .then(value=>setTransactionsData((value)))


},[])

Then in the render, 
you would map over {transactionsData}, probably. Or convert it in some way, if needed.


*/