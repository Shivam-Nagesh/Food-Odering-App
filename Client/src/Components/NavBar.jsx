import { useEffect } from 'react';
import '../CSS/NavBar.css';
import { useAuthContext } from '../Context/authContext';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {

    const { auth } = useAuthContext();

    useEffect(() => {
        const ele = document.querySelector('.Profile-Pic');
        if (auth.user?.avatar) {
            ele.src = auth.user.avatar
        }
    }, [auth]);

    useEffect(() => {

        const cookie = Cookies.get('userLocation');
        if (cookie) {
            const data = JSON.parse(cookie);
            if (data.precise) {
                const ele = document.querySelector('.Location-text');
                const address = data.address;
                ele.innerHTML = address;
            }
        }
    }, [])

    const getLocation = (e) => {

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                // searchRadius is in meters so routes upto 13km servicable
                // setAuth((auth) => ({ ...auth, coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude }, searchRadius: 13 * 1000 }));
                const coords = pos.coords;
                try {
                    // https://api.geoapify.com/v1/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&type=amenity&lang=en&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`)
                    const response = await axios(`https://api.geoapify.com/v1/geocode/reverse`, {
                        params: {
                            lat: coords.latitude,
                            lon: coords.longitude,
                            type: 'amenity',
                            lan: 'en',
                            apiKey: process.env.REACT_APP_GEOAPIFY_API_KEY,
                        }
                    })
                    const location = response.data.features[0].properties;
                    const ele = document.querySelector('.Location-text');
                    const address = `${location.address_line1},${location.street},${location.state}-${location.postcode}`
                    ele.innerHTML = address;
                    const data = { latitude: coords.latitude, longitude: coords.longitude, address, precise: true };
                    Cookies.set('userLocation', JSON.stringify(data), { expires: 1 })
                }
                catch (e) {
                    console.log('error in geoapify');
                }
            },
            (err) => {
                console.log('error in geolocation', err);
            },
            { enableHighAccuracy: true }
        )

    }

    return (
        <nav className='navBar-container'>
            <ul className='navBar-wrapper'>
                <li><NavLink to='/'><img className='Logo' src="/foodLogo.png" alt="" /></NavLink></li>
                <li onClick={getLocation}>
                    <svg viewBox="0 0 16 17" fill="#FF5200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.1828 1.84246C13.7623 0.516285 15.0521 -0.146802 15.6759 0.448004C16.2997 1.04281 15.6986 2.36264 14.4965 5.00231L11.0318 12.6101C9.78188 15.3547 9.15692 16.727 8.28744 16.6338C7.41796 16.5407 7.09629 15.0596 6.45294 12.0973C6.29606 11.375 6.21761 11.0138 5.97533 10.7649C5.73305 10.5161 5.37563 10.4285 4.6608 10.2532L4.29783 10.1642C1.65419 9.51589 0.332363 9.19175 0.234059 8.35677C0.135754 7.52179 1.34615 6.89952 3.76695 5.65497L11.1828 1.84246Z" fill="#FF5200"></path>
                    </svg>
                    <div className='Location-text'>Get My Current Location </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5200">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                </li>
                <li ><input type='text' placeholder='Search for returant and food' /><i className="fa fa-search"></i></li>
                <li>
                    <NavLink to='/profile'>
                        <img className='Profile-Pic' src="/default-profile-img.jpg" alt='ProfilePicture'/>
                    </NavLink>
                    {auth.user ? <button><NavLink to='/profile'>{auth.user.fullName}</NavLink></button> : <button><NavLink to='/signup'>SIGN UP</NavLink></button>}
                </li>
            </ul>
        </nav>
    )
}

export default NavBar