import React from 'react';
import { Link } from 'react-router-dom';
const AllProducts = props => {
  const products = props.products;
  //  const categories = props.categories;
   // const all = [];
    
   // categories.forEach(category => {

//        all.push(category)
  //      products.forEach(product => {
    //        if (product.categoryId === category.id){
           
      //      all.push(product)
        //    }
        //})
        
    //})
    //function handleClick(caller){
      //  console.log(caller.target)
        //const productList = document.getElementsByClassName("product")
        //console.log(productList, "product list")
        //const productArray=Array.from(productList)
       // const categoryId= caller.target.classList[0]
        //console.log(categoryId)
       // productArray.forEach((el)=>{
         //   el.style.display="none"
        //}
        //)
       // productArray.forEach((el)=>{
         //   const classArray=Array.from(el.classList)
           // const classes=classArray.find(
             //   (className) => 
               // {
               // if(className==categoryId){
                 //   return true
               // }
               // return false
           // })
           // if(classes){
             //   el.style.display="block"
            //}
       // })
       // }
    




  return (
    <div className="all-products-container">
      <h2 className="title"> Our Products</h2>
      <div className="products-container">
      //lex
      {
                all.map((category)=>{
                    return <div key={all.id} onClick={handleClick}>
                        <h3 className={category.id}> {category.category} </h3>
                        
                        </div>
                })
               
            }
      //end of lex
        {products.map(product => {
          return (
            <div key={product.id} className={`product ${product.categoryId}`} className="single-product">
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
                        <p> category: {product.categoryId} </p>
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
