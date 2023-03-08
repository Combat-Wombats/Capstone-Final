import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Navigation.js/Login';
import Register from './Navigation.js/Register';
import { fetchUser, fetchAllProducts, fetchSingleProduct } from '../api';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';

const Search = ({ products })=>{
  const { term } = useParams();
  return (
    <ul>
      {
        products.filter(product => {
          return !term || product.name.includes(term)
        }).map( product => {
          return (
            <li key={ product.id }>
              { product.name }
            </li>
          );
        })
      }
    </ul>
  );
};

const App = ()=> {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null)
  const [products, setProducts] = useState([]);
  const [ product, setProduct] =useState([]);

console.log('this is user', auth)
useEffect(()=> {
    const fetchData = async () => {
      const fetchProducts = await fetchAllProducts();
      setProducts(fetchProducts);
    }
    fetchData();
  }, [])

  useEffect(()=> {
        const fetchSingleData = async (productId) => {
          const fetchSingleProducts = await fetchSingleProduct(productId);
          setProduct(fetchSingleProducts);
        }
        fetchSingleData();
      }, [])

  const attemptLogin = ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      fetch(
        '/api/auth',
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

  // useEffect(() => {
  //   const exchangeTokenForUser = async () => {
  //     let windowToken = window.localStorage.getItem('token');
  //     if (windowToken) {
  //       setToken(windowToken)
  //       let user = await fetchUser(token);
  //       setUser(user);
  //     }
  //   };
  //   exchangeTokenForUser();
  // }, [token])
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

const navigate = useNavigate();
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
              <Link to='/allProducts'> All Products</Link>
            </>
          )
        }
      </nav>
        <input 
          placeholder='search for products' 
          className='search'
          onChange = {
            (ev)=> {
              navigate(`/allProducts/search/${ev.target.value}`);
              //console.log(ev.target.value);
            }
          }/>
      <Routes>
        {
          auth.id ? (
            <>
            <Route path='/' element= { <Home auth={ auth }/> } />
            </>

          ): (
            <>
            <Route path='/login' element= { <Login login={ login } token = {token}/> } />
            <Route path='/register' element = {<Register setUser={setUser} setToken={setToken} token= {token}/>} />
            <Route path='/allProducts' element = {<AllProducts  products={products} setProducts={setProducts}/>} />
            <Route path='/allProducts/search/:term' element = {<Search  products={products}/>} />
            <Route path='/allProducts/search' element = {<Search  products={products}/>} />
            <Route path='/singleProduct' element = {<SingleProduct  product={product} setProduct={setProduct}/>} />
            </>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
