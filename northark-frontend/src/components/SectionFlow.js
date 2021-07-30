import { useContext, useEffect, useState } from 'react';
import Login from '../containers/Login';
import { UserContext } from '../contexts/UserContext'
import Table from './Table';


export default function SectionFlow(props){
    const [userState, setUserState] = useContext(UserContext);
    const [sectionState, setSectionState] = useState("Home")
    
    if (!userState.loggedin){
        return(
            <Login />
        )
    }

    if (sectionState==="Home"){
        return( 
            <div>temporary landing
            <button onClick={()=>{setSectionState("Transactions")}}>View Transaction History</button>
            </div>      
         )
    }

    if (sectionState==="Transactions"){
        return(
            <Table/>      
         )
    }


    return(
        <div>An error with page routing has occured.</div>
    )

}
