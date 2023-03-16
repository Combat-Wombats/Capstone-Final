import React from 'react';
import { Link, useParams} from 'react-router-dom';
const AllProducts = props => {
  const categories = props.categories;
  const { id } = useParams();
  const products = props.products.filter(product => !id || id*1 === product.categoryId);
  console.log(id);
    
    


  return (
    <div className="all-products-container">
      <h2 className="title"> Our Products ({ products.length })</h2>

      <div className = "categorical">
                {
                  categories.map((category)=>{
                    return <div className="individualCategory">

                    <h3 className={ id*1 === category.id ? 'selected': '' }>
                      <Link to={id*1 === category.id ? '/allProducts': `/allProducts/byCategory/${category.id}`}>{category.category}</Link></h3>
                    </div>
                  })
                }
                    </div>
      <div className="products-container">
        {products.map(product => {
          return (
            <div key={product.id} className={`product ${product.categoryId}`}  style ={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"  
            }}>
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
                        {/* <p> category: {product.categoryId} </p> */}
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
