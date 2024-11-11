import React, { createContext, useState, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'

export const errorContext = createContext(false);
export const useErrorPage = ()=>{
  return useContext(errorContext);
}

const Layout = () => {

  const [error, seterror] = useState(false);

  return (
    <errorContext.Provider value={ {error, seterror} }>
        {!error && <NavBar />}
        <Outlet />
    </errorContext.Provider>
 )
}

export default Layout