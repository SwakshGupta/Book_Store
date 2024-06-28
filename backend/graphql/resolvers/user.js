// Resolvers tells our server what to return when a perticular query is called

// and yeah the resolver which you have created should match with the typedefs you have  created

import User from "../../model/user.js" // Adjust the path as per your file structure

  export const resolver = {
  Query: {
    getUserById: async (_, { userId }) => {
      // this resolver should match with the query defined in the typedef
      try {
        const user = await User.findById(userId);
        return user; // whatever returned by the resolver it will return to the client
      } catch (err) {
        throw new Error(
          `Failed to fetch user with ID ${userId}: ${err.message}`
        );
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(`Failed to fetch all users: ${err.message}`);
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      // here _ represnts the parent object
      try {
        const newUser = await User.create(input);
        return newUser;
      } catch (err) {
        throw new Error(`Failed to create user: ${err.message}`);
      }
    },
    updateUser: async (_, { userId, input }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, input, {
          new: true,
        });
        return updatedUser;
      } catch (err) {
        throw new Error(
          `Failed to update user with ID ${userId}: ${err.message}`
        );
      }
    },
    deleteUser: async (_, { userId }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
      } catch (err) {
        throw new Error(
          `Failed to delete user with ID ${userId}: ${err.message}`
        );
      }
    },
  },
};



/*
in resolver function we  basically have four parameters 

1. is the parent field
2. the paramter pass by the us while defining the mutation and queries
3. is the context

First filed is kept _ means empty becuase we dont have any parent field which is returning us anything 


*/
