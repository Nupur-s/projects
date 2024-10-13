import { createContext, useContext, useState } from "react";

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

function AuthProvider({children}){
    const[isAdmin,setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));
    const[authenticated,setAuthenticated] = useState(JSON.parse(localStorage.getItem('authenticated')));
    return(
        <authContext.Provider value ={{isAdmin, setAdmin, authenticated,setAuthenticated}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;