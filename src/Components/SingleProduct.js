import React from 'react';
import { useParams } from 'react-router-dom';


const SingleProduct = (props) => {
    const product = props.product;
    // const params = useParams();
    // const id = params.id;
    // const product = products.find((productId) => productId.id === id);
    // console.log(product, "this is new new")
    console.log(product, " my product")
  // console.log(product, "this is indv")
  
    return (
        <div> 
            {

            

                product.map((single) => {
                  console.log(single, "test")
                  
                    return <div key={single.id}>
                        <h3> Name: {single.name} </h3>
                        <p> Description: {single.description}</p>
                        <p> Features: {single.features} </p>
                        <p> Price: {single.price} </p>
                        <p> Location: {single.location} </p>
                        <p> Will Deliver: {single.willDeliver} </p>
                        <p> Used ? {single.used} </p>
                        <p> Shipping ? {single.shipping} </p>
                        </div> 
                       
                })
            }
          
        </div>
    )
}
// const SingleProduct = (props) => {
//   const product = props.product;

//   console.log(product, "this is indv")

//   return (
//       <div> 
//           <div key={product.id}>
//               <h3> Name: {product.name} </h3>
//               <p> Description: {product.description}</p>
//               <p> Features: {product.features} </p>
//               <p> Price: {product.price} </p>
//               <p> Location: {product.location} </p>
//               <p> Will Deliver: {product.willDeliver} </p>
//               <p> Used ? {product.used} </p>
//               <p> Shipping ? {product.shipping} </p>
//           </div> 
//       </div>
//   )
// }

export default SingleProduct

