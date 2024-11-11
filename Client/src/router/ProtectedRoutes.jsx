import React, { useEffect } from 'react'
import { useAuthContext } from '../Context/authContext';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {

    const { auth } = useAuthContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!auth.user){
            navigate('/',{replace: true});
            return;
        }
    },[navigate])

    return <Outlet />
}

export default ProtectedRoutes