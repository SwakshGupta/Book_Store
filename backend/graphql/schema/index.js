import { mergeTypeDefs } from '@graphql-tools/merge';
import { booksTypeDefs } from './books.js';
import { userTypeDefs } from './user.js';

const typeDefs = mergeTypeDefs([userTypeDefs, booksTypeDefs]);



export {typeDefs};
