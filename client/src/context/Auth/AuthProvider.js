import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
  //  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const [userDetails, setUserDetails] = useState('');
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, userDetails, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
