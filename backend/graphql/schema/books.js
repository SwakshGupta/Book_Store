import { gql } from "apollo-server";

export const booksTypeDefs = gql`
  type Book {
    title: String!
    author: String
    price: Float
  }

  type Books {
    year: String!
    books: [Book!]!
    price: Float
    branch: String
    image: String
  }

  input BookInput {
    title: String!
    author: String
    price: Float
  }

  type AddBooks {
    _id: ID!
    year: String!
    branch: String!
    books: [Book!]!
    notesIncluded: Boolean!

    image: String
  }

  input AddBooksInput {
    year: String!
    branch: String!
    books: [BookInput!]!
    notesIncluded: Boolean!

    image: String
  }

  type Query {
    getBooksById(_id: String): AddBooks!
    getAllBooks: [AddBooks!]!
  }

  type Mutation {
    addBooks(input: AddBooksInput): AddBooks!
    deleteBooks(id: ID!): Boolean!
  }
`;
