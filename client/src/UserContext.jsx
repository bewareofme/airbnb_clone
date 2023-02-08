import axios from "axios"
import { createContext, useEffect, useState } from "react"


 export const UserContext=createContext({})

 export const UserContextProvider=({children})=>{
    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data)
                setReady(true)
            })
        }
    },[])
    const [user,setUser]=useState(null)
    const [ready,setReady]=useState(false)
    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )
 }
