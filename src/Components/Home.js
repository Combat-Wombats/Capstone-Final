import React from 'react';
import { Link } from 'react-router-dom';

const Home = ()=> {
  return (
    <div className='background-container'>
      <div className='background'
      style={{
        backgroundSize: 'cover',
        backgroundImage: 'url(/static/home.png)',
        width: "100%",
        height: "100vh",
      }}>
        <div id='text1'>
          <h6>Welcome to Our Music Store</h6>
        </div>
        <div id='text2'>
          <h2>From Starters To Pro...</h2>
        </div>
        <div id='text3'>
          <p>You'll find a huge range of musical equipments and accessories just for you</p>
        </div>
        <div className='link-to-products'>
          <Link to="/allProducts">Products Here</Link> 
        </div>
      </div>
    </div>
  );
};

export default Home;
