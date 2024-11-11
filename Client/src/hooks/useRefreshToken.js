import { api } from "../Api/api";
import { useAuthContext } from '../Context/authContext';


const useRefreshToken = () => {

    const { setauth } = useAuthContext();
    const refresh = async () => {
      try {
        const response = await api.get("/auth/refresh");
        console.log('ran setAuth');
        setauth((auth) => {
          console.log(`inside refresh, new accessToken ${response.data.accessToken}`);
          return {...auth, accessToken: response.data.accessToken};
        });
        return response.data.accessToken; 
      } catch (error) {
        console.log("refreshToken failed!!");
        return undefined; 
      }
    };
  
    return refresh;
  };


export default useRefreshToken;
