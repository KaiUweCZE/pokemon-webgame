"use client"
import { ReactNode, createContext, useEffect, useState } from "react"

interface UserProviderProps {
    children: ReactNode
}

interface UserContextType {
    currentUser: Record<string, any> | null;
    setCurrentUser: (user: Record<string, any> | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({children}: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState<any>(null)
    
    useEffect(() => {
        // Uložení uživatele do lokálního úložiště při každé změně
        if (currentUser) {  
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          const storedUser = localStorage.getItem("currentUser");
          if (storedUser) {
            console.log("stored user");
            
            setCurrentUser(JSON.parse(storedUser))
          }
          
        } /*else {
          localStorage.removeItem("currentUser");
        }*/
      }, [currentUser]);
    
    useEffect(() => {
        console.log("change", currentUser);
      }, [currentUser]);
    const contextValue = {
        currentUser,
        setCurrentUser
    }

    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}