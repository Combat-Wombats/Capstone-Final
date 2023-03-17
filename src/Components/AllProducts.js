import React from 'react';
import { Link } from 'react-router-dom';
const AllProducts = props => {
  const products = props.products;
    const categories = props.categories;
    const all = [];
    
    function handleClick(caller){
        //console.log(caller.target)
        const productList = document.getElementsByClassName("product")
        const productArray=Array.from(productList)
        const categoryId= caller.target.classList[0]
        const products = "product " + categoryId
        productArray.forEach((el)=>{
            el.style.display="none";
            if (products === el.className){
              el.style.display="flex"
            }
        }
        )
      }
    




  return (
    <div className="all-products-container">
      <h2 className="title"> Our Products</h2>

      <div className = "categorical">
                {
                  categories.map((category)=>{
                    return <div className="individualCategory" onClick={handleClick}>

                    <h3 className={category.id}> {category.category} </h3>
                    </div>
                  })
                }
                    </div>
      <div className="products-container">
      {/* //lex
      {
                all.map((category)=>{
                    return <div key={all.id} onClick={handleClick}>
                        <h3 className={category.id}> {category.category} </h3>
                        
                        </div>
                })
               
            }
      //end of lex */}
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
              <img className='productPhotos' src= {product.img}/>
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
