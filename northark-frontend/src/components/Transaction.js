export const Transaction = props => {


  let [transactionsData, setTransactionsData] = useState("")

  useEffect(()=>{
    fetchTransactions("user", 1, "default")
    .then(value=>setTransactionsData((value)))

    /*
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

  let response = await fetch('https://LOCALHOSTBACKENDURLGOESHERE.com?' + new URLSearchParams({
    username: user,
    accountnumber: account,
    sort: sortCommand,
  }));
  let result = await response.json();

  /*
  URLSearchParams is basically just a nice way to add the API query to the URL, unless I misunderstand something. 
  If I did misunderstand something, I can use something else.

  Will have to rewrite the exact arguments of course, based on how the GET function ends up
  working on the backend, but this is a decent example for now.

  May haev to convert the user prop to a string or something.

  Placeholder sort command for now.
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