import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Navigation.js/Login";
import Register from "./Navigation.js/Register";
import {
  fetchUser,
  fetchAllProducts,
  fetchSingleProduct,
  fetchAllCategories,
} from "../api";

import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import AllProducts from "./AllProducts";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";

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

  useEffect(() => {}, []);

  const attemptLogin = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetch("/api/auth", {
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
          .then((cart) => setCart(cart))});

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
      .then((data) => {
        if (data.token) {
          console.log("data nakon logovanja", data);
          window.localStorage.setItem("token", data.token);
          attemptLogin();
        } else {
          console.log(data);
        }
      });
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="headerContainer">
      <img src="static/logo.png"></img>
      <h1 className="header">Combat Wombat Commerce</h1>
      <nav className='main-nav' >
      
        
        {
          auth.id ? (
            <div className='navBar'>
            <h3>Welcome: {user.username}</h3>
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
            <Link to="/allProducts" style={{ color: "white" }}>
              {" "}
              All Products
            </Link>
            <Link to="/carts" style={{ color: "white" }}>
              Cart ({cart.products?.length})
            </Link>
            <button onClick={logout}>Logout {auth.username}</button>
          </div>
        ) : (
          <>
            <div className="navBar">
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
              <Link to="/register" style={{ color: "white" }}>
                {" "}
                Register
              </Link>
              <Link to="/allProducts" style={{ color: "white" }}>
                {" "}
                All Products
              </Link>
              {/* <Link to='/cart'>Cart</Link> */}
            </div>
          </>
        )}
      </nav>
      </div>
        <input 
          placeholder='Search for Products' 
          className='search'
          onChange = {
            (ev)=> {
              navigate(`/allProducts/search/${ev.target.value}`);
              if(ev.target.value === ""){
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
            <Route
              path="/allProducts"
              element={
                <AllProducts products={products} setProducts={setProducts} />
              }
            />
            <Route
              path="/allProducts/search/:term"
              element={<Search products={products} />}
            />
            <Route
              path="/allProducts/search"
              element={<Search products={products} />}
            />
            <Route
              path="/allProducts/:productId"
              element={
                <SingleProduct product={product} setProduct={setProduct} setCart={setCart} auth= {auth} />
              }
            />
            <Route
              path="/carts"
              element={<Cart cart={cart} setCart={setCart} />}
            />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={
                <Login
                  login={login}
                  token={token}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register setUser={setUser} setToken={setToken} token={token} />
              }
            />
            <Route
              path="/allProducts"
              element={
                <AllProducts
                  categories={categories}
                  products={products}
                  setProducts={setProducts}
                />
              }
            />
            <Route
              path="/allProducts/search/:term"
              element={<Search products={products} />}
            />
            <Route
              path="/allProducts/search"
              element={<Search products={products} />}
            />
            <Route
              path="/allProducts/:productId"
              element={
                <SingleProduct product={product} setProduct={setProduct} />
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
