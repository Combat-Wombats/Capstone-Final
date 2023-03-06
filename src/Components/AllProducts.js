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
                        <p> Price: {product.price} </p>
                        <p> Location: {product.location} </p>
                        <p> Is the product used? {product.used} </p>
                        <p> Delivery? {product.delivery} </p>
                        <p> Shipping ? {product.shipping} </p>
                        </div> 
                })
            }
        </div>
    )
}

export default AllProducts