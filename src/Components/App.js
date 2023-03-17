import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Home from "./Home";
import Login from "./Navigation.js/Login";
import Register from "./Navigation.js/Register";
import AllProducts from "./AllProducts";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import Admin from "./Admin"
import { fetchAllProducts, fetchAllCategories } from "../api";
import { FaHome } from 'react-icons/Fa';
import { FiShoppingCart } from 'react-icons/Fi';

const Search = ({ products }) => {
  const { term } = useParams();
  return (
    <ul>
      {products
        .filter((product) => {
          return !term || product.name.includes(term);
        })
        .map((product) => {
          return <li key={product.id}>{product.name}</li>;
        })}
    </ul>
  );
};

const App = () => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({});
  const [users, setUsers] = useState([])

  // console.log(user, 'ths is ')
  useEffect(() => {
    const fetchData = async () => {
      const fetchProducts = await fetchAllProducts();
      setProducts(fetchProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchCategories = await fetchAllCategories();
      setCategories(fetchCategories);
    };
    fetchData();
  }, []);

  useEffect(() => { }, []);
  const navigate = useNavigate();

  const attemptLogin = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      return fetch("/api/auth", {
        method: "GET",
        headers: {
          authorization: token,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          setAuth(user)
          fetch(`/api/instruments/carts/${user.id}`)
            .then((response) => response.json())
            .then((cart) => setCart(cart))
        });

    }
  };

  useEffect(() => {
    attemptLogin();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  const login = async ({ username, password }) => {
    fetch("/api/auth/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async(data) => {
        if (data.token) {
          console.log("data nakon logovanja", data);
          window.localStorage.setItem("token", data.token);
          await attemptLogin();
          console.log('I logged in with login');
          navigate('/allProducts');
        } else {
          console.log(data);
        }
      });
  };

  return (
    <div>
      <div className="headerContainer">
        <img src="static/logo.png"></img>
        <h1 className="header">Combat Wombat Commerce</h1>
        <nav className='main-nav' >
          {
            auth.id ? (
              <div className='navBar'>
                <h3>Welcome: {auth.username}</h3>
                <div>
                  <Link className="navLink" to="/"><FaHome /></Link>
                  <Link className="navLink" to="/allProducts"> {" "} All Products </Link>
                  <Link className="navLink" to="/carts"><FiShoppingCart /> ({cart.products?.length})</Link>
                  {auth.admin ? <Link className="navLink" to="/admin"> Admin </Link> : null}
                  <button className="navLink" onClick={logout}>Logout {auth.username}</button>
                </div>
              </div>

            ) : (
              <>
                <div className="navBar">
                  <Link className="navLink" to="/login">Login</Link>
                  <Link className="navLink" to="/register">{" "} Register </Link>
                  <Link className="navLink" to="/allProducts">{" "} All Products</Link>
                </div>
              </>
            )}

        </nav>
      </div>
      <input
        placeholder='Search for Products'
        className='search'
        onChange={
          (ev) => {
            navigate(`/allProducts/search/${ev.target.value}`);
            if (ev.target.value === "") {
              navigate(`/allProducts`)
            } else {
              navigate(`/allProducts/search/${ev.target.value}`);
            }
          }
        }
      />
      <button type="submit"><i className="material-icons">search</i></button>
      <Routes>
        {auth.id ? (
          <>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="/allProducts" element={<AllProducts products={products} setProducts={setProducts} categories={categories} />
              }/>
            <Route path="/allProducts/byCategory/:id" element={<AllProducts products={products} setProducts={setProducts} categories={categories} />}/>
            <Route path="/allProducts/search/:term" element={<Search products={products} />}/>
            <Route path="/allProducts/search" element={<Search products={products} />}/>
            <Route path="/allProducts/:productId" element={<SingleProduct product={product} setProduct={setProduct} setCart={setCart} auth={auth} />}/>
            <Route path="/carts" element={<Cart cart={cart} setCart={setCart} />}/>
            <Route path="/admin" element={<Admin users={users} setUsers={setUsers} />}/>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login login={login} token={token} user={user} setUser={setUser}/>}/>
            <Route path="/register" element={<Register attemptLogin={ attemptLogin } setUser={setUser} setToken={setToken} token={token} />}/>
            <Route path="/allProducts" element={<AllProducts categories={categories} products={products} setProducts={setProducts}/>}/>
            <Route path="/allProducts/byCategory/:id" element={<AllProducts products={products} setProducts={setProducts} categories={categories} /> }/>
            <Route path="/allProducts/search/:term" element={<Search products={products} />}/>
            <Route path="/allProducts/search" element={<Search products={products} />}/>
            <Route path="/allProducts/:productId" element={<SingleProduct product={product} setProduct={setProduct} />}/>
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
