import {gql} from  'apollo-server'

 export const booksTypeDefs = gql`
 type Book {
    title: String!
    author: String
    price: Float
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
   
    image:String
  }
  
  input AddBooksInput {
    year: String!
    branch: String!
    books: [BookInput!]!
    notesIncluded: Boolean!
    
    image:String
    
  }
  
  type Query {
   getBooksByName(name:String):[Book]!
   getBooks:[Book]
  }
  
  type Mutation {
    addBooks(input: AddBooksInput!): AddBooks!
    deleteBooks(id:ID!):Boolean!
  }
  
`;



