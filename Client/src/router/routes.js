import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../Pages/Home';
import ErrorPage from '../Pages/ErrorPage';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import ProfilePage from '../Pages/ProfilePage';
import ProtectedRoutes from './ProtectedRoutes';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            
            <Route element={<ProtectedRoutes/>} >
                <Route path='/profile' element={<ProfilePage/>}/>
            </Route>

            <Route path='*' element={<ErrorPage/>} />
        </Route>
    )
)

export default router;