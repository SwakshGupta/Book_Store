import React, { useState } from "react";
import { FiFilter, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onBranchSelect, onYearSelect }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const navigate = useNavigate();

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setShowFilter(false);
    onBranchSelect(branch); // Notify parent component about selected branch
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowFilter(false);
    onYearSelect(year); // Notify parent component about selected year
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const handleProfile = () => {
    navigate("/Profile");
  };

  const getFilterLabel = () => {
    let label = "Filter";
    if (selectedBranch) label += `: ${selectedBranch}`;
    if (selectedYear) label += `, ${selectedYear}`;
    return label;
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg w-full">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">BookStore</div>
        <div className="flex items-center space-x-2">
          {/* Filter Button */}
          <div className="relative">
            <button
              className="bg-white text-blue-600 p-2 rounded-md flex items-center space-x-2 hover:bg-blue-500 hover:text-white"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FiFilter />
              <span className="hidden md:block">{getFilterLabel()}</span>
            </button>
            {showFilter && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <span className="font-bold">Branch</span>
                </div>
                <button
                  className={`w-full text-left px-4 py-2 ${
                    selectedBranch === "Computer Science"
                      ? "bg-blue-200"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => handleBranchSelect("Computer Science")}
                >
                  Computer Science
                </button>
                <button
                  className={`w-full text-left px-4 py-2 ${
                    selectedBranch === "Mechanical"
                      ? "bg-blue-200"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => handleBranchSelect("Mechanical")}
                >
                  Mechanical
                </button>
                <div className="px-4 py-2 border-t border-gray-200">
                  <span className="font-bold">Year</span>
                </div>
                <button
                  className={`w-full text-left px-4 py-2 ${
                    selectedYear === "2023"
                      ? "bg-blue-200"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => handleYearSelect("2023")}
                >
                  2023
                </button>
                <button
                  className={`w-full text-left px-4 py-2 ${
                    selectedYear === "2024"
                      ? "bg-blue-200"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => handleYearSelect("2024")}
                >
                  2024
                </button>
              </div>
            )}
          </div>

          {/* Profile button */}
          <button
            className="bg-white text-blue-600 p-2 rounded-md flex items-center space-x-2 hover:bg-blue-500 hover:text-white"
            onClick={handleProfile}
          >
            <FiUser />
            <span className="hidden md:block">Profile</span>
          </button>

          {/* Logout button */}
          <button
            className="bg-white text-blue-600 p-2 rounded-md flex items-center space-x-2 hover:bg-blue-500 hover:text-white"
            onClick={handleLogout}
          >
            <FiLogOut />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
