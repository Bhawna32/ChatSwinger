import { createContext, useEffect, useState } from "react";

export const GlobalInfo = createContext();
export const ContextProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const value = {
        username, 
        setUsername,
        password, 
        setPassword
    }
  return (
    <GlobalInfo.Provider value={value}>
      {children}
    </GlobalInfo.Provider>
  )
}