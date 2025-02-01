"use client"
import React, { useEffect, useState, useContext } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiMiniShoppingCart } from "react-icons/hi2";
import Link from 'next/link'
import CartContent from "../cart component/cart component/cart content";
import { CartContext } from "../context folder/appContext";
import { motion } from "framer-motion";

// export let changeAddToCart = false;
// export let productsIDInTheCartListpagetotal = 0;

function Cart() {
    const [deliveryFee, setDeliveryFee] = useState(1500);
    const [subtotal, setSubtotal] = useState(0);
    const [foodState, setFoodState] = useState([]);
    const [tax, setTax] = useState(0);

    const cart = useContext(CartContext);

    useEffect(() => {
        const fetchData = () => {
            const allFoods = JSON.parse(localStorage.getItem("userCart")) || [];
            if (allFoods.length === 0) {
                setFoodState("Oops! Cart is Empty");
            } else {
                setTax(5);
                setFoodState(
                    allFoods.map((item, index) => (
                        <CartContent
                            key={index}
                            {...item}
                            removeFromCart={() => {
                                cart.deleteFromCartList(item.id);
                                if (allFoods.length === 1) {
                                    setTax(0);
                                    setDeliveryFee(0);
                                    setFoodState("Oops! Cart is Empty");
                                }
                            }}
                        />
                    ))
                );
            }
        };

        fetchData();
    }, [cart.productsInTheCartList]);

    useEffect(() => {
        setSubtotal(cart.totalCart + deliveryFee + tax);
    }, [cart.totalItemInCart]);

    return (
        <div className="fixed inset-0 bg-gray-100  flex justify-end items-start z-50">
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <motion.h1
                    className="text-4xl font-bold text-gray-500 sm:block hidden"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    We are Reliable, Swift and Truthful .<br /> We are the best
                </motion.h1>
            </div>
            <div className="w-130 max-w-xl bg-white h-full shadow-lg p-5 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <Link href="/">
                        <p className="text-lg font-bold text-orange-500">Mr Smart Wears</p>
                    </Link>
                    <Link href="/">
                        <IoCloseCircleOutline className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer" />
                    </Link>
                </div>

                {/* Cart Title */}
                <h2 className="text-center text-gray-900 font-bold text-lg my-3">Your Cart</h2>
                <div className="text-center">{foodState}</div>

                {/* Promo Code Input */}
                <div className="flex gap-2 my-3">
                    <input type="text" placeholder="Promo code" className="border p-2 flex-1 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <button className=" text-orange-500 px-3 py-2 h-10 ">
                        Apply
                    </button>
                </div>

                {/* Cart Summary */}
                <div className="space-y-2 text-gray-900">
                    <div className="flex justify-between">
                        <p>Tax:</p>
                        <p>₦{tax}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Delivery Fee:</p>
                        <p>₦{deliveryFee}</p>
                    </div>
                    <div className="flex justify-between font-medium">
                        <p>Cart Total:</p>
                        <p>₦{cart.totalCart}</p>
                    </div>
                </div>

                <hr className="my-3" />

                {/* Subtotal */}
                <div className="flex justify-between font-bold text-gray-900">
                    <p>Subtotal:</p>
                    <p>₦{subtotal}</p>
                </div>

                {/* Checkout Button */}
                <Link href={subtotal !== 0 ? "/checkoutpage" : "#"}>
                    <button className={`w-full text-orange-500 py-2 mt-3 rounded-md  ${subtotal === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-orange-500"}`}>
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
