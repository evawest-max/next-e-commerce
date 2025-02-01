"use client"
import { useState } from "react";
import Link from 'next/link'
import { FiMenu, FiX } from "react-icons/fi";
import CartIcon from "../cart component/cartIcon";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 left-0 w-full z-50">
            <h2 className="text-lg sm:text-xl font-bold text-orange-500 flex justify-center items-center">
               <img src="https://png.pngtree.com/png-clipart/20200720/original/pngtree-orange-logo-design-png-image_4781563.jpg" alt="logo"  width="40px" height="40px"/> Mr Smart Wears
            </h2>

            {/* Deskhtop Navigation */}
            <ul className="hidden md:flex space-x-6 text-gray-700" >
                <Link href="/"  style={{color:"gray"}}>Home</Link>
                <Link href="/shop"  style={{color:"gray"}}>Shop</Link>
                <Link href="/about"  style={{color:"gray"}}>About</Link>
                <Link href="/contact"  style={{color:"gray"}}>Contact</Link>
            </ul>

            <div className="flex items-center space-x-4">
                <CartIcon />
                <Link href="/login" className="text-gray-700 hover:text-orange-500" style={{color:"gray"}}>
                    Login
                </Link>
                
                {/* Mobile Menu hrefggle */}
                <buthrefn className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </buthrefn>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute hrefp-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
                    <Link href="/"  style={{color:"gray"}} onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/shop"  style={{color:"gray"}} onClick={() => setIsOpen(false)}>Shop</Link>
                    <Link href="/about"  style={{color:"gray"}} onClick={() => setIsOpen(false)}>About</Link>
                    <Link href="/contact"  style={{color:"gray"}} onClick={() => setIsOpen(false)}>Contact</Link>
                    <Link href="/login"  style={{color:"gray"}} onClick={() => setIsOpen(false)}>Login</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;