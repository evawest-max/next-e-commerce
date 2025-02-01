"use client";
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
  
  const [productsInTheCartList, setProductInTheCartList] = useState([]);
  const [numberOfItemsInCart, setnumberOfItemsInCart] = useState(0);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("userCart")) || [];
    setProductInTheCartList(storedProducts);
    setnumberOfItemsInCart(storedProducts.length);
    getTotalCart();
  }, []);

  function getproductquantity(id) {
    const allwears = JSON.parse(localStorage.getItem("userCart")) || [];
    const product = allwears.find(item => item.id === id);
    return product ? product.quantity : 0;
  }

  function addItemsToCartList(id, price, title, image ) {
    let allwears = JSON.parse(localStorage.getItem("userCart")) || [];
    const existingProduct = allwears.find(item => item.id === id);

    if (!existingProduct) {
      allwears.unshift({ id, price, title, image, quantity: 1 });
    }

    localStorage.setItem("userCart", JSON.stringify(allwears));
    setProductInTheCartList(allwears);
    setnumberOfItemsInCart(allwears.length);
    getTotalCart();
    console.log(productsInTheCartList)
  }

  function deleteFromCartList(id) {
    let allwears = JSON.parse(localStorage.getItem("userCart")) || [];
    let updatedProducts = allwears.filter(product => product.id !== id);

    updatedProducts.length
      ? localStorage.setItem("userCart", JSON.stringify(updatedProducts))
      : localStorage.removeItem("userCart");

    setProductInTheCartList(updatedProducts);
    setnumberOfItemsInCart(updatedProducts.length);
    getTotalCart();
  }

  function increaseProductQuantity(id) {
    let allwears = JSON.parse(localStorage.getItem("userCart")) || [];
    let updatedProducts = allwears.map(product => 
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );

    localStorage.setItem("userCart", JSON.stringify(updatedProducts));
    setProductInTheCartList(updatedProducts);
    getTotalCart();
  }

  function decreaseProductQuantity(id) {
    let allwears = JSON.parse(localStorage.getItem("userCart")) || [];
    let updatedProducts = allwears.map(product => 
      product.id === id && product.quantity > 1 
        ? { ...product, quantity: product.quantity - 1 } 
        : product
    ).filter(Boolean);

    updatedProducts.length
      ? localStorage.setItem("userCart", JSON.stringify(updatedProducts))
      : localStorage.removeItem("userCart");

    setProductInTheCartList(updatedProducts);
    setnumberOfItemsInCart(updatedProducts.length);
    getTotalCart();
  }

  function getTotalCart() {
    const allwears = JSON.parse(localStorage.getItem("userCart")) || [];
    const total = allwears.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setTotalCart(total);
  }

  const contextValue = {
    numberOfItemsInCart,
    productsInTheCartList,
    totalCart,
    getproductquantity,
    increaseProductQuantity,
    addItemsToCartList,
    decreaseProductQuantity,
    deleteFromCartList,
    getTotalCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export default CartProvider;
