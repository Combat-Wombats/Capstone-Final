import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Navigation.js/Login';
import Register from './Navigation.js/Register';
import { fetchUser } from '../api';
import { Link, Routes, Route } from 'react-router-dom';


const App = ()=> {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null)
  const attemptLogin = ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      fetch(
        '/api/auth/',
        {
          method: 'GET',
          headers: {
            'authorization': token 
          }
        }
      )
      .then( response => response.json())
      .then( user => setAuth(user));
    }
  };

  useEffect(()=> {
    attemptLogin();
  }, []);

  useEffect(() => {
    const exchangeTokenForUser = async () => {
      let windowToken = window.localStorage.getItem('token');
      if (windowToken) {
        setToken(windowToken)
        let user = await fetchUser(token);
        setUser(user);
      }
    };
    exchangeTokenForUser();
  }, [token])
  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  const login = async({ username, password})=> {
    fetch(
      '/api/auth/',
      {
        method: 'POST',
        body: JSON.stringify({ username, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then( response => response.json())
    .then( (data) => {
      if(data.token){
        window.localStorage.setItem('token', data.token);
        attemptLogin();
      }
      else {
        console.log(data);
      }
    });
  };

  return (
    <div>
      <h1>Combat Wombat</h1>
      <nav>
        {
          auth.id ? (
            <>
              <Link to='/'>Home</Link>
              <button onClick={ logout }>Logout { auth.username }</button>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )
        }
      </nav>
      <Routes>
        {
          auth.id ? (
            <>
            <Route path='/' element= { <Home auth={ auth }/> } />
            </>

          ): (
            <>
            <Route path='/login' element= { <Login login={ login } token = {token}/> } />
            <Route path = '/register' element = {<Register setUser={setUser} setToken={setToken} />} />
        
            </>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
