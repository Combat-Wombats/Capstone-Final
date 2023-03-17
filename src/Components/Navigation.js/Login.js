import React, { useState } from 'react';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = (ev) => {
    ev.preventDefault();
    login({ username, password });
  };
  return (
    <div className='login'>
      <div className='loginComp'>
        <h1>Login</h1>
        <form onSubmit={_login}>
          <input
            placeholder='username'
            value={username}
            onChange={ev => setUsername(ev.target.value)}
          />
          <input
            placeholder='password'
            type='password'
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className="loginBtn" > LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
