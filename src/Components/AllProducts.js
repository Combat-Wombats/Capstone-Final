import React from 'react'

const AllProducts = (props) => {
    const products = props.products;

    return (
        <div> 
            <h2> Our Products</h2>
            {
                products.map((product) => {
                    return <div key={product.id}>
                        <h3> Name: {product.name} </h3>
                        <p> Description: {product.description}</p>
                        <p> Features: {product.features} </p>
                        <p> Price: {product.price} </p>
                        <p> Location: {product.location} </p>
                        <p> Will Deliver: {product.willDeliver} </p>
                        <p> Used ? {product.used} </p>
                        <p> Shipping ? {product.shipping} </p>
                        </div> 
                })
            }
        </div>
    )
}

export default AllProducts