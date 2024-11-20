/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";


const SessionContext = createContext()



export const useSession = () => useContext(SessionContext)



export const SessionProvider = ({children}) => {

    const [session, setSession] = useState(null)

    useEffect(() => {

        const savedSession = localStorage.getItem('session')

        if(savedSession){

            setSession(JSON.parse(savedSession))
        }


    },[])


    const setSessionData =(sessionData) => {
        setSession(sessionData)
        localStorage.setItem('session', JSON.stringify(sessionData))
    }

    const clearSession = () => {
        localStorage.removeItem('session');
        sessionStorage.removeItem('foundCharacters')
        setSession(null);
    };



    return (
        <SessionContext.Provider value={{session, setSessionData, clearSession}}>
            {children}
        </SessionContext.Provider>
    )
}