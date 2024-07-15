//When a user select a perticular book detail of that book opens up along with the detail of the  user 

// in the book model itself there is a field user where i am  storing  the user id from that we can extract the user detail 

import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom"; // we are passing the id in params 
import UserDetails from "./user";

// we are redering the userDetail component inside the component as passing the userId in props

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
      userId
    }
  }
`;

const BookDetails = () => {
  const { id } = useParams();  // extracting the id from the params 
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data.getBooksById; // data is the result of the graphql query

  return (
    <div>
      <h1>{book.books[0].title}</h1>
      <p>Year: {book.year}</p>
      <p>Branch: {book.branch}</p>
      <p>Notes Included: {book.notesIncluded ? "Yes" : "No"}</p>
      <img src={book.image} alt={book.books[0].title} />
      
      <UserDetails userId={book.userId} /> 
    </div>
  );
};

export default BookDetails;
