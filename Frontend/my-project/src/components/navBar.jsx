// here i will create the navbar of the book store

import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white font-bold text-xl mb-4 md:mb-0">
          BookStore
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search books..."
            />
            <FiSearch className="absolute top-2 left-2 text-gray-400" />
          </div>
          <button className="bg-white text-blue-600 p-2 rounded-md flex items-center space-x-2 hover:bg-blue-500 hover:text-white">
            <FiFilter />
            <span>Filter</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
