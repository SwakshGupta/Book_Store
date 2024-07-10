import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
    
    year: Int!
    hostelOrRoomNo: String!
    branch: String!
    phone:Int
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignupInput {
    username: String
    email: String!
    password: String!
    year: Int!
    hostelOrRoomNo: String!
    branch: String!
    phone:String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    phone:String
    year: Int
    hostelOrRoomNo: String
    branch: String
  }

  type Query {
    getUserById(userId: ID!): User
  }

  type Mutation {
    signup(input: SignupInput): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateUser(userId: ID!, input: UpdateUserInput!): User
    deleteUser(userId: ID!): User
  }
`;
