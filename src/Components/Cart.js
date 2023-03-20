import React, { useEffect } from 'react';
import { fetchMyCart,fetchAddToCart} from "../api"


const Cart = ({ cart, setCart, auth }) => {

  const refresh = ()=>{
    fetchMyCart(auth.id)
    .then((data)=>{
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
    // refreshing cart number
    fetchMyCart(auth.id)
    .then((data)=>{
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
  return (
    <div>
      <h2>Cart:</h2>
      <ul>
        {cart.products?.map((product) => {
          return (
            <li>
              {product.name}({product.quantity})
              <div className='cart-btn'>
              <button className='add-btn' onClick={async ()=>{
                addToCartFe(product.id)
              }}> + </button>
          
              <button
                className='delete-btn'
                onClick={async () => {
                  const updatedCart = await deleteProductFromCart(product.id);
                }}
              >
                DELETE PRODUCT
              </button>
              </div>
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

