import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../api';
export const Register = (props) => {
    const {attemptLogin} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async(ev) => {
        ev.preventDefault();
      try {
        const register = await fetchRegister(username, password)
        if(register.token){
          window.localStorage.setItem('token', register.token);
          await attemptLogin();
          navigate('/allProducts');
        }
      }
      catch(ex){
        console.log(ex);
      }
    };
    return (
        <div className='register-section'>
             <h1>Register</h1>
              <form onSubmit={ register }>
                <input
                placeholder='username'
                value = { username }
                onChange = { ev => setUsername(ev.target.value) }
                />
                <input
                placeholder='password'
                type = 'password'
                value={ password }
                onChange = { ev => setPassword(ev.target.value) }
                />
                <button>Register</button>
            </form>   
            <Link to='/Login'>
                Already Have An Account? Click Here.
            </Link>
        </div>
       

    );
};
 
export default Register
