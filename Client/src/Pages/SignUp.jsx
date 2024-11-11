import { NavLink, useNavigate } from 'react-router-dom';
import '../CSS/Signup.css';
import {api} from '../Api/api';

const SignUp = () => {

  const navigate = useNavigate();
  const fromValidation = async (e)=>{

    e.preventDefault();
    const data = new FormData(document.forms['signup-form']);
    const phoneRegex = new RegExp('^[0-9]{10}$');
    let res = true;
    res = res && phoneRegex.test(data.get('phone'));
    res = res && data.get('fullName').trim();
    res = res && data.get('email').toLowerCase().trim();
    res = res && (data.get('password').length === 4);
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
      setTimeout(()=>{
        navigate('/signin');
      },2*1000);
      messageElement.innerHTML = 'Account Created!! Redirecting to SignUp Page';
      messageElement.style.display = 'flex';
      messageElement.style.backgroundColor = 'rgba(172, 255, 47, 0.801)';
      messageElement.style.color = 'rgb(0, 0, 155)';

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
    <section className="singup-section">
        <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
                <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                <h1 className="opacity">SIGN UP</h1>
                <form name='signup-form'>
                    <div className='form-promt-message'>Account Made successfully!!!</div>
                    <input type='text' placeholder='USERNAME' name='fullName' required/>
                    <input type='text' placeholder='PHONE' name='phone' required/>
                    <input type="text" placeholder="EMAIL" name='email' required/>
                    <input type="password" placeholder="PASSWORD" name='password' required/>
                    <button className="opacity" type='submit' onClick={fromValidation}>SUBMIT</button>
                </form>
                <div className="opacity register-forget">
                    Already have an account? <NavLink to='/signin' >Sign In</NavLink>
                </div>
            </div>
            <div className="circle circle-two"></div>
        </div>
    </section>
  )
}

export default SignUp