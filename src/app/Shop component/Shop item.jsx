"use client"
import { useState, useContext } from "react";
import { BsCartPlusFill, BsFillCartDashFill } from "react-icons/bs";
import { CartContext } from "../context folder/appContext"; // Ensure this is correctly set up

function Shopitem(props) {
    const { id, title, price, oldprice, description, image, rating, category } = props;
    const formattedPrice = new Intl.NumberFormat().format(price);
    const formattedOldPrice = oldprice ? new Intl.NumberFormat().format(oldprice) : null;

    const cart = useContext(CartContext); // Use cart context

    const [inCart, setInCart] = useState(false);
    const [expanded, setExpanded] = useState(false);

    function toggleCart() {
        if (inCart) {
            cart.deleteFromCartList(id);
        } else {
            cart.addItemsToCartList(id, price, title, image);
        }
        setInCart(!inCart);
    }

    const descriptionText = expanded
        ? description
        : description?.length > 90
            ? `${description.substring(0, 89)}...`
            : description;

    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md p-4">
            <img 
                src={image} 
                alt={title} 
                className="rounded-lg w-full max-h-72 object-cover transition-transform duration-300 transform hover:scale-90" 
            />
            <div className="mt-4 space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-800">
                    {descriptionText}{" "}
                    {description?.length > 90 && (
                        <span
                            onClick={() => setExpanded(!expanded)}
                            className="text-orange-500 cursor-pointer"
                        >
                            {expanded ? "less" : "more"}
                        </span>
                    )}
                </p>
                <div className="flex items-center gap-4 text-gray-800">
                    <strong>Rating:</strong> <span>{rating?.rate || "N/A"}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-800">
                    <strong>Category:</strong> <span>{category}</span>
                </div>
                <p className="text-2xl text-gray-800">
                    {formattedOldPrice && <del className="text-gray-500">₦{formattedOldPrice}</del>} ₦{formattedPrice}
                </p>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between">
                <button className=" text-gray-500 px-4 py-2 rounded">Buy now</button>
                <button
                    className="border px-4 py-2 rounded flex justify-center items-center text-gray-500"
                    onClick={toggleCart}
                >
                    {inCart ? (
                        <>
                            Remove <BsFillCartDashFill className="ml-1 text-orange-500" />
                        </>
                    ) : (
                        <>
                            Add to cart <BsCartPlusFill className="ml-1 text-orange-500" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default Shopitem;