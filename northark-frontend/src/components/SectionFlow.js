import { useContext, useEffect, useState } from 'react';
import Login from '../containers/Login';
import { UserContext, SectionContext } from '../contexts/UserContext'
import Table from './Table';
import LandingPage from './Landing';


export default function SectionFlow(props){
    const [userState, setUserState] = useContext(UserContext);
    const [sectionState, setSectionState] = useContext(SectionContext)
    
    if (!userState.loggedin){
        return(
            <Login />
        )
    }

    if (sectionState==="Home"){
        return( 
            <LandingPage/> 
         )
    }

    if (sectionState==="Transactions"){
        return(
            <Table/>      
         )
    }


    return(
        <div>An error with page routing has occured. Current section state is:{JSON.stringify(sectionState)}</div>
    )

}
