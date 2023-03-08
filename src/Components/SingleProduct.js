import React from 'react';


const SingleProduct = (props) => {
    const product = props.product;
    
  console.log(product, "this is indv")
  
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

export default SingleProduct