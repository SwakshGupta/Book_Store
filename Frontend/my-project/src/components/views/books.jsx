// in this component i am going to render all the books present in the data base

import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Define your GraphQL query
export const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    getAllBooks {
      books {
        price
        author
        title
      }
      branch
      image
      year
      _id
      notesIncluded
    }
  }
`;

const GetAllBooks = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-10">
      {" "}
      {/* Adjust margin */}
      {data.getAllBooks.map((book) => (
        <Link key={book._id} to={`/Userbook/${book._id}`} className="book-link">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-2">Year: {book.year}</p>
              <p className="text-gray-700 text-sm mb-2">
                Branch: {book.branch}
              </p>
            </div>
          </div>
        </Link>
      ))}
      <Link to="/Addbooks" className="fixed bottom-4 right-4">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <span className="text-2xl">+</span>
        </button>
      </Link>
    </div>
  );
};

export default GetAllBooks;
