import React, { useEffect, useRef } from 'react'
import { api } from '../Api/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Components/Loading';
import ErrorPage from './ErrorPage';
// import TempButton from '../Temp/TempButton';
import Carousel from '../Components/HomeSwiperCarousal';
import '../CSS/Home.css';


// So first idea was to store city in auth state and then in backend if auth.coords => params.cords === undefined then find it by city (i.e no [lon,lat] and searchRadius);

// going with second idea
// So second idea is why need of city in frontend as is not Displaying it anywhere so let backend handle all the city fetching as ip is already there 

const Home = () => {

  const navigateRef = useRef(useNavigate());

  useEffect(() => {

    const fetchLocation = async () => {
      try {
        const res = await axios(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`);
        const coords = res.data.location;
        const city = res.data.city.name;
        const precise = false;
        return { ...coords, city, precise };
      }
      catch (e) {
        return null;
      }
    }
    const result = Cookies.get('userLocation');
    if (!result) {
      (async () => {
        const location = await fetchLocation();
        console.log(location);
        if (location) Cookies.set('userLocation', JSON.stringify(location), { expires: 1 })
        else navigateRef.current('/ErrorPage', {
          state: {
            status: 502,
            message: 'Cant Get relative Address',
          },
        });
      })()
    }

  }, []);

  const { isPending, error } = useQuery({
    queryKey: ["fetch at path /"],
    queryFn: async () => {
      const res = await api.get('/');
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    retryOnMount: false,
  });

  if(isPending) return <Loading />;
  if(error) return <ErrorPage status={503} message={'Server Down'}/>

  return (
    <section className='homeSection'>
    <Carousel />
    {/* <TempButton /> */}
    </section>
  )
}

export default Home