"use client";
import { useState, useContext } from "react";
import { CartContext } from "../../context folder/appContext";

function ItemQuantity({ id, price, quantity, }) {
  const cart = useContext(CartContext);

  let [quantitys, newQuantitys] = useState(quantity);

  function increaseQuantitys() {
    cart.increaseProductQuantity(id, price);
  }

  function decreaseQuantitys() {
    quantity > 1 && cart.decreaseProductQuantity(id, price);
  }

  return (
    <div className="min-w-[20px] h-full bg-gray-700 ml-2 flex flex-col items-center">
      <p
        className="cursor-pointer text-center bg-orange-500 text-white w-full py-1"
        onClick={increaseQuantitys}
      >
        +
      </p>
      <p className="text-center text-white py-1">{quantity}</p>
      <p
        className="cursor-pointer text-center bg-orange-500 text-white w-full py-1"
        onClick={decreaseQuantitys}
      >
        -
      </p>
    </div>
  );
}

export default ItemQuantity;
