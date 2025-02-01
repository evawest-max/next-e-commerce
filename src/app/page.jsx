"use client"
import React, { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
const Fooditem = React.lazy(() => import("./Shop component/Shop item"));

function ShowRoom() {
  const [itemsInDatabase, setItemsInDatabase] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 
  const listRef = useRef(null);

  useEffect(() => { // to fetch the data when ever the page renders
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setItemsInDatabase(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredItems = itemsInDatabase.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVisibleItems(filteredItems);
  }, [searchQuery, itemsInDatabase]);

  // Pagination logic
  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const findFood = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // function to reset to first page when search query changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // to Scroll to the top of the page
  };

  const displayedItems = paginate(visibleItems, currentPage, itemsPerPage);

  return (
    <div className="mt-24 px-10 mb-10">
      <div ref={listRef}>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            onChange={findFood}
            placeholder="Search"
            className="border border-orange-500 focus:ring-orange-500 focus:border-orange-500 rounded px-3 py-1 w-72"
          />
          <IoIosSearch className="text-orange-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {loading ? (
            <div className="flex justify-center">
              <div className="loader"></div> Loading items...
            </div>
          ) : displayedItems.length ? (
            displayedItems.map((item) => (
              <Suspense key={item.id} fallback={<div className="loader"></div>}>
                <Fooditem
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  rating={item.rating}
                />
              </Suspense>
            ))
          ) : (
            <div>An error occurred, items could not be loaded.</div>
          )}
        </div>

        {/* for Controling the Pagination  */}
        <div className="flex justify-center space-x-4 mt-6">
          {currentPage > 1 && (
            <button
              className="px-4 py-2  text-orange-500 rounded-md"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {visibleItems.length > currentPage * itemsPerPage && (
            <button
              className="px-4 py-2 text-orange-500 rounded-md "
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowRoom;
