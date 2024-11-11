import { RouterProvider } from 'react-router-dom';
import './CSS/App.css';
import router from './router/routes';
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from './Context/authContext';

function App() {

  const protectedApi = useAxiosPrivate();
  const { setAuth } = useAuthContext();

  const {data, error, isPending} = useQuery({
    queryKey: ['login'],
    queryFn: async()=>{
      const res = await protectedApi.get('/auth/login', {timeout: 800});
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
  })
  if(!isPending && !error){
    setAuth((auth)=>({...auth, user: {...data.user}}));
  }
  if(isPending){
    return<></>;
  }
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;