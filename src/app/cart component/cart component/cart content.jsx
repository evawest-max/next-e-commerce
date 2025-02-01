"use client";
import React, { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import ItemQuantity from "./itemQuantity";

export default function CartContent({
    id,
    price,
    title,
    image,
    quantity,
    // vendorName,
    // updateFoodState,
    removeFromCart,
}) {
    const [photo, setPhoto] = useState("https://image.pngaaa.com/604/2532604-middle.png");

    return (
        <div className="flex bg-gray-100 m-2 gap-2 rounded-md shadow-md shadow-orange-400 items-center relative p-2">
            <ItemQuantity
                id={id}
                price={price}
                quantity={quantity}
                
                // updateFoodState={updateFoodState}
                // removeFromCart={removeFromCart}
            />

            <img className="w-12 h-12 object-cover" src={image || photo} alt="food" />

            <div className="flex flex-col text-gray-900 mx-auto">
                <p className="text-xs">{title}</p>
                <p className="text-sm font-bold">₦{price}</p>
            </div>

            <MdOutlineDeleteForever
                onClick={removeFromCart}
                className="absolute top-1 right-2 text-red-600 bg-red-200 rounded-full cursor-pointer text-xl"
            />
        </div>
    );
}
