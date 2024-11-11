import React, { createContext, useContext, useState } from "react";

export const authContext = createContext({});

export const useAuthContext = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({})
  
  
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
