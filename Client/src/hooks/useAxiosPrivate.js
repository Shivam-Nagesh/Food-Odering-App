import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuthContext } from "../Context/authContext";
import { protectedApi } from "../Api/api";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    
    const requestIntercept = protectedApi.interceptors.request.use(
      (config) => {
        if (config && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = protectedApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          if (newAccessToken) {
            setAuth((auth) => ({ ...auth, accessToken: newAccessToken }));
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return protectedApi(prevRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      protectedApi.interceptors.request.eject(requestIntercept);
      protectedApi.interceptors.request.eject(responseIntercept);
    };
  }, [refresh, auth, setAuth]);

  return protectedApi;
};

export default useAxiosPrivate;