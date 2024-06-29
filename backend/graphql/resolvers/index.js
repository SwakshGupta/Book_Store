import { userResolvers } from './user.js';
import { booksResolvers } from './books.js';

export const resolvers = [
  userResolvers,
  booksResolvers
];
