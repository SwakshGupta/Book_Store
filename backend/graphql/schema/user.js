// since graph ql is a query language so we have to define a schema for that

import { gql } from 'apollo-server';

 export const userTypeDefs = gql`
  type User {
   
    username: String!
    image: String
    year: Int!
    hostelOrRoomNo: String!
    branch: String!
  }

  input CreateUserInput {
    username: String!
    image: String
    year: Int!
    hostelOrRoomNo: String!
    branch: String!

  }

  type Query {
    getUserById(userId: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(userId: ID!, input: CreateUserInput!): User
    deleteUser(userId: ID!): User
  }
`;




// this gql tag converts our graph ql string into the graphql string which can be read by the apollo server
