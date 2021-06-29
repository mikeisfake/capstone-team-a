export const Transaction = props => {


  let [transactionsData, setTransactionsData] = useState("")

  useEffect(()=>{
    fetchTransactions(arguments)
    .then(value=>setTransactionsData((value)))
  
  
  },[])
  
  

  return (
    // not sure how to format these but I hate working with tables so maybe a list??
    // this would be the component for the individual transaction item. Ideally pull transactions from DB and map over them to make this compoennt for each one and pass data as props to this.
    <li className="transaction-item"></li>
  )
}



async function fetchTransactions(){

  let response = await fetch('URL');
  let result = await response.json();

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