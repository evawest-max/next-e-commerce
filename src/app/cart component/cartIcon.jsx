"use client"
import { useContext } from "react";
import { BsCartFill } from "react-icons/bs";
import { CartContext } from "../context folder/appContext"; // Ensure this context is set up
import Link from 'next/link'

function CartIcon() {
    const cart = useContext(CartContext);
    const cartCount = cart?.numberOfItemsInCart || 0; // Fallback to 0

    return (
        <Link href="/cart" aria-label="Shopping Cart">
            <div className="relative cursor-pointer">
                <BsCartFill className="text-orange-500 text-2xl" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                )}
            </div>
        </Link>
    );
}

export default CartIcon;
