// in this component i am going to render all the books present in the data base

import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

// this is get all books query which is getting everything from the database
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
  const { loading, error, data } = useQuery(GET_ALL_BOOKS); // using useQuery hook to put our getAllBooks inside it

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.getAllBooks.map((book) => (
        <div
          key={book._id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-gray-700 text-sm mb-2">Year: {book.year}</p>
            <p className="text-gray-700 text-sm mb-2">Branch: {book.branch}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetAllBooks;
