import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [totalCartItem, setTotalCartItem] = useState(cart.length);
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <CartContext.Provider value={{ totalCartItem, setTotalCartItem, totalPrice, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
