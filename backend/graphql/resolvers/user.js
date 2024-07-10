// Resolvers tells our server what to return when a perticular query is called

// and yeah the resolver which you have created should match with the typedefs you have  created

import User from "../../model/user.js"; // Adjust the path as per your file structure

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config(); //The dotenv.config() function is used to load environment variables from a .env file into process.env.

export const userResolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new error("User not found in the database");
        }

        return user;
      } catch (err) {
        console.error(err);
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const {
        username,
        email,
        password,
        year,
        hostelOrRoomNo,
        branch,
        phone,
      } = input;

      console.log("the function is working ");
      console.log( process.env.your_secret_key)

      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const newUser = new User({
          username,
          email,
          password,
          year,
          hostelOrRoomNo,
          branch,
          phone,
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
          { userId: savedUser.id },
          process.env.your_secret_key,
          { expiresIn: "1h" }
        );

        return {
          token,
          user: savedUser,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { input }) => {
      const { email, password } = input;
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        // Check if the password is correct
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //   throw new Error('Invalid credentials');
        // }

        if (password != user.password) {
          throw new Error("Invalid credentials");
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user.id },
          process.env.your_secret_key, // a token will be generated when the user logsin
          { expiresIn: "1h" }
        );

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    updateUser: async (_, { userId, input }) => {
      try {
        const user = await User.findByIdAndUpdate(userId, input, { new: true });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteUser: async (_, { userId }) => {
      try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
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

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from './models/User';

// const resolvers = {
//   Query: {
//     getUserById: async (_, { userId }) => {
//       try {
//         const user = await User.findById(userId);
//         if (!user) {
//           throw new Error('User not found');
//         }
//         return user;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//   },
//   Mutation: {
//     signup: async (_, { input }) => {
//       const { username, email, password, image, year, hostelOrRoomNo, branch } = input;
//       try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//           throw new Error('User already exists');
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 12);

//         // Create a new user
//         const newUser = new User({
//           username,
//           email,
//           password: hashedPassword,
//           image,
//           year,
//           hostelOrRoomNo,
//           branch,
//         });

//         const savedUser = await newUser.save();

//         // Generate JWT token
//         const token = jwt.sign(
//           { userId: savedUser.id },
//           'your_secret_key', // Replace with your secret key
//           { expiresIn: '1h' }
//         );

//         return {
//           token,
//           user: savedUser,
//         };
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     login: async (_, { input }) => {
//       const { email, password } = input;
//       try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//           throw new Error('User not found');
//         }

//         // Check if the password is correct
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           throw new Error('Invalid credentials');
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//           { userId: user.id },
//           'your_secret_key', // Replace with your secret key
//           { expiresIn: '1h' }
//         );

//         return {
//           token,
//           user,
//         };
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     updateUser: async (_, { userId, input }) => {
//       try {
//         const user = await User.findByIdAndUpdate(userId, input, { new: true });
//         if (!user) {
//           throw new Error('User not found');
//         }
//         return user;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     deleteUser: async (_, { userId }) => {
//       try {
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) {
//           throw new Error('User not found');
//         }
//         return user;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//   },
// };

// export default resolvers;
