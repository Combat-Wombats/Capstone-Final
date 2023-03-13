import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRegister } from '../../api';
export const Register = (props) => {
    const {setUser, setToken} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async(ev) => {
        ev.preventDefault();
        const register = await fetchRegister(username, password)
        const token = window.localStorage.getItem("token");
        console.log(register)
        if(register.token){
            setToken(register.token);
            window.localStorage.setItem('token', token);
        }
        if(register.user){
            setUser(register.user);
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