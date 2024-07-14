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

  type AddBooks {
    _id: ID!
    year: String!
    branch: String!
    books: [Book!]!
    notesIncluded: Boolean!
    image: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    year: String
    hostelOrRoomNo: String
    branch: String
    phone: String
    books: [AddBooks!]!
  }

  input BookInput {
    title: String!
    author: String
    price: Float
  }

  input AddBooksInput {
    year: String
    branch: String!
    books: [BookInput!]!
    notesIncluded: Boolean!
    image: String
    userId: ID 
  }

  type Query {
    getBooksById(_id: String): AddBooks!
    getAllBooks: [AddBooks!]!
    getUserWithBooks(userId: String): User! # Updated return type
  }

  type Mutation {
    addBooks(input: AddBooksInput): AddBooks!
    deleteBooks(id: ID!): Boolean!
  }
`;
