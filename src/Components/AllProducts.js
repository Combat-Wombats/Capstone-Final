import React from 'react';
import { Link } from 'react-router-dom';
const AllProducts = props => {
  const products = props.products;

  return (
    <div className="all-products-container">
      <h2 className="title"> Our Products</h2>
      <div className="products-container">
        {products.map(product => {
          return (
            <div key={product.id} className="single-product">
              <h3 className="product-name">
                {' '}Name: {product.name}{' '}
              </h3>
              {/* <p> Description: {product.description}</p>
                        <p> Features: {product.features} </p> */}
              <p className="product-price">
                {product.price}
              </p>
              {/* <p> Location: {product.location} </p>
                        <p> Will Deliver: {product.willDeliver} </p>
                        <p> Used ? {product.used} </p>
                        <p> Shipping ? {product.shipping} </p> */}
              <Link
                to={`/allProducts/${product.id}`}
                className="view-details-button"
              >
                View details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;

// ADAM: changed the URL with the proper product id
