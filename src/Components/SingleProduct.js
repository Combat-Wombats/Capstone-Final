import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAddToCart, fetchMyCart, fetchSingleProduct } from '../api';
import { Link } from 'react-router-dom';
// ADAM: use --> useParams for single view
// ADAM: added is loading when prodcuts doesn't exist
const SingleProduct = ({setCart, auth}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const addToCartFe = async()=>{
    const data ={orderId: 555, productId}; // this data will be ignored for now
    const response = await fetchAddToCart(productId);
    console.log("add to cart response is here", response);
    // refreshing cart number
    fetchMyCart(auth.id)
    .then((data)=>{
      console.log("fetchovan cart", data);
      if(data && Array.isArray(data.products)){
        setCart(data)
      }
    })
    
  }

  useEffect(
    () => {
      const fetchProduct = async () => {
        const data = await fetchSingleProduct(productId);
        setProduct(data);
      };
      fetchProduct();
    },
    [productId]
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {product.name}
      </h2>
      <p>
        Price: {product.price}
      </p>
      <p>
        Description: {product.description}
      </p>
      <p>
        Features: {product.features}
      </p>
      <p>
        Location: {product.location}
      </p>
      <div>

        <button className="add-to-cart" onClick={addToCartFe}>
            {/* to="/carts"
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold'
            }} */}
          
            Add to Cart
        </button>
        <button className="continue-shopping-button">
          <Link
            to="/allProducts"
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            Continue Shopping
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
