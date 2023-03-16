import React, { useEffect } from 'react';
import { fetchMyCart,fetchAddToCart} from "../api"


const Cart = ({ cart, setCart }) => {

  const refresh = ()=>{
    fetchMyCart()
    .then((data)=>{
      console.log("fetchovan cart", data);
      if(data && Array.isArray(data.products)){
        setCart(data)
      }
    })
  };

  useEffect(()=>{
    refresh(); // first fetch
  }, []);

  const addToCartFe = async(productId)=>{
    const data ={orderId: 555, productId}; // this data is ignored for now
    const response = await fetchAddToCart(productId);
    console.log("add to cart response is here", response);
    // refreshing cart number
    fetchMyCart()
    .then((data)=>{
      console.log("fetchovan cart", data);
      if(data && Array.isArray(data.products)){
        setCart(data);
        // after cart update do refresh
        refresh();
      }
    })
  }

  const deleteProductFromCart = async (productId) => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    const response = await fetch(`/api/instruments/carts/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      
    });
    console.log(response, "our response")
    
    const updatedCart = await response.json();
    setCart(updatedCart);
    return updatedCart;
  };

  const purchaseCart = async () => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    const response = await fetch(`/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const newCart = await response.json();
    setCart(newCart);
  };

  console.log('Cart: ', cart);
  return (
    <div>
      <h2>Cart:</h2>
      <ul>
        {cart.products?.map((product) => {
          return (
            <li>
              {product.name}({product.quantity})
              <div>
              <button onClick={async ()=>{
                addToCartFe(product.id)
              }}> + </button>
              </div>
              
              <button
                onClick={async () => {
                  const updatedCart = await deleteProductFromCart(product.id);
                }}
              >
                DELETE PRODUCT
              </button>
            </li>
          );
        })}
      </ul>
      <button className="purCart"
        onClick={async () => {
          const newCart = await purchaseCart();
        }}
      >
        PURCHASE CART
      </button>
    </div>
  );
};

export default Cart;

