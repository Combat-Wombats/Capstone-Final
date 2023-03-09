import React from 'react'

const AllProducts = (props) => {
    const products = props.products;
    const categories = props.categories;
    const all = [];
    
    categories.forEach(category => {

        all.push(category)
        products.forEach(product => {
            if (product.categoryId === category.id){
           
            all.push(product)
            }
        })
        
    })
    function handleClick(caller){
        console.log(caller.target)
        const productList = document.getElementsByClassName("product")
        //console.log(productList, "product list")
        const productArray=Array.from(productList)
        const categoryId= caller.target.classList[0]
        //console.log(categoryId)
        productArray.forEach((el)=>{
            el.style.display="none"
        }
        )
        productArray.forEach((el)=>{
            const classArray=Array.from(el.classList)
            const classes=classArray.find(
                (className) => 
                {
                if(className==categoryId){
                    return true
                }
                return false
            })
            if(classes){
                el.style.display="block"
            }
        })
        }
    


    return (
        <div> 
        
        
            <h2> Our Products </h2>
            {
                all.map((category)=>{
                    return <div key={all.id} onClick={handleClick}>
                        <h3 className={category.id}> {category.category} </h3>
                        
                        </div>
                })
               
            }
            
            
            {
                products.map((product) => {
                    return <div className={`product ${product.categoryId}`}  key={product.id}>
                        <h3> Name: {product.name} </h3>
                        <p> Description: {product.description}</p>
                        <p> Features: {product.features} </p>
                        <p> Price: {product.price} </p>
                        <p> Location: {product.location} </p>
                        <p> Will Deliver: {product.willDeliver} </p>
                        <p> Used ? {product.used} </p>
                        <p> Shipping ? {product.shipping} </p>
                        <p> category: {product.categoryId} </p>
                        </div> 
                })
            }
        </div>
    )
}

export default AllProducts