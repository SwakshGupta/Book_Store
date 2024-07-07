// THis is the homepage where  books of different year is going to be there

//   i will create  different graph ql api
import React from "react";

const Homepage = () => {
  const categories = [
    { year: "1 Year", description: "Books for first year" },
    { year: "2 Year", description: "Books for second year" },
    { year: "3 Year", description: "Books for third year" },
    { year: "4 Year", description: "Books for fourth year" },
    { year: "5 Year", description: "Books for fifth year" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to the homepage of the website
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.year}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">{category.year}</h2>
            <p className="text-gray-700">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
