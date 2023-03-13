import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../api';
import { Link } from 'react-router-dom';
// ADAM: use --> useParams for single view
// ADAM: added is loading when prodcuts doesn't exist
const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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
