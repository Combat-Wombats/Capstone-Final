import React from 'react';
import { Link } from 'react-router-dom';

const Home = ()=> {
  return (
    <div className='background-container'>
      <div className='background'>
        <div className='texts-background'>
          <h6>Welcome to Our Music Store</h6>
          <h2>From Starters To Pro...</h2>
          <p>You'll find a huge range of musical equipments and accessories just for you</p>
        </div>
          <Link to="/allProducts">Products Here</Link> 
      </div>
    </div>
  );
};

export default Home;
