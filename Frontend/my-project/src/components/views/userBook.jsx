// when the user clicks on a perticular  book this component will pops up

// this page will have image,different type of books present in the set,price of book,userPhone number,userbhawan/Room number

// Here we will get the detailed information of book when the user clicks on a perticaular card

// so we will pass the id if that book and then with the help of get books by id we will retrieve the information of that book

// apart from that we will use the user model of that user to get the infromation regarding  the userPhone,Bhawan and room number

import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom"; // we are passing the id in params 

const GET_BOOK_BY_ID = gql`
  query GetBooksById($id: String!) {
    getBooksById(_id: $id) {
      _id
      year
      branch
      books {
        title
        author
        price
      }
      notesIncluded
      image
    }
  }
`;

const UserBook = () => {
  const { id } = useParams();  // extracting the id from the params 
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data.getBooksById; // data  is the result of the graphql query 

  return (
    <div>
      <h1>{book.books.title}</h1>
      <p>Year: {book.year}</p>
      <p>Branch: {book.branch}</p>
      <p>Notes Included: {book.notesIncluded ? "Yes" : "No"}</p>
      <img src={book.image} alt={book.books.title} />
    </div>
  );
};

export default UserBook;
