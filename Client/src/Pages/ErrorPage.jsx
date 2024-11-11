import { useEffect } from 'react';
import '../CSS/ErrorPage.css';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom'
import { useErrorPage } from '../router/Layout';


const ErrorPage = (props) => {

    // const ele = document.querySelector('.navBar-container');
    // if(ele) ele.style.display = 'none';
    // console.log(ele);
    const location = useLocation();
    const navigate = useNavigate();
    const {error, seterror} = useErrorPage();
    
    useEffect(()=>{
        seterror(()=>true);
        return()=>{
            seterror(()=>false);
        }
    },[seterror]);

    console.log('errorPage',error);

    return (
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Arvo"
                />
            </Helmet>
            <section className="error-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center "> {location.state?.status | props?.status || 404}  </h1>
                                </div>
                                <div className="contant_box_404">
                                    <h3 className="h2">
                                        {location.state?.message || props?.message || "Look like you're lost"}
                                    </h3>
                                    <p>The page you are looking for not avaible!</p>
                                    <button className="link_404" onClick={() => (location.pathname === '/' ? window.location.reload() : navigate('/', { replace: true }))}>Go Home</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ErrorPage