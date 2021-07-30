import { useContext, useEffect, useState } from 'react';
import { UserContext, SectionContext } from '../contexts/UserContext'


export default function LandingPage(props){
    const [userState, setUserState] = useContext(UserContext);
    const [sectionState, setSectionState] = useContext(SectionContext)


    return(
        <div>
        <div>Welcome, {userState.name}!</div>
        <button onClick={()=>{setSectionState("Transactions")}}>View Transaction History</button>
        </div>
    )

}
