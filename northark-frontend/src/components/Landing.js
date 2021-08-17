import { useContext, useEffect, useState } from 'react';
import { UserContext, SectionContext } from '../contexts/Contexts'


export default function LandingPage(props){
    const [userState, setUserState] = useContext(UserContext);
    const [sectionState, setSectionState] = useContext(SectionContext)


    return(
        <div className="Landing">
        <div>Welcome, {userState.name}!</div>
        <button className="Landing-Transaction-Button" onClick={()=>{setSectionState("Transactions")}}>View Transaction History</button>
        </div>
    )

}
