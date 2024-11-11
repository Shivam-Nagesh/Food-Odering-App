import '../CSS/SignIn.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {api} from '../Api/api';

const SignIn = () => {
  
  const navigate = useNavigate();
  const fromValidation = async (e)=>{

    e.preventDefault();
    const data = new FormData(document.forms['signup-form']);

    let res = true;
    res = res && data.get('email').toLowerCase().trim();
    res = res && (data.get('password').length !== 0);

    const messageElement = document.querySelector('.form-promt-message');

    if(!res){
      messageElement.innerHTML = 'Fill Form Correctly';
      messageElement.style.display = 'flex';
      messageElement.style.backgroundColor = 'rgba(255, 0, 0, 0.774)';
      messageElement.style.color = 'white';
      return;
    }
    
    try{
      await api.post('/user', data);
      navigate('/signin');
    }catch(error){

      if(error.status >= 400)
        messageElement.innerHTML = `${error.message || 'Fill Form Correctly'}`;
      else
        messageElement.innerHTML = 'Network Error: Server is unreachable';

      messageElement.style.display = 'flex';
      messageElement.style.backgroundColor = 'rgba(255, 0, 0, 0.774)';
      messageElement.style.color = 'white';
    }

  }
  
  return (
    <section className="signin-section">
        <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
                <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                <h1 className="opacity">LOG IN</h1>
                <form name='signin-form'>
                    <div className='form-promt-message'>Account Made successfully!!!</div>
                    <input type="email" placeholder="EMAIL" required/>
                    <input type="password" placeholder="PASSWORD" required/>
                    <button className="opacity" type='submit' onClick={fromValidation}>SUBMIT</button>
                </form>
                <div className="opacity register-forget">
                    Do not have an account? <NavLink to='/signup'>Sign Up</NavLink>
                </div>
            </div>
            <div className="circle circle-two"></div>
        </div>
    </section>
  )
}

export default SignIn