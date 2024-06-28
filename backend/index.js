import { ApolloServer } from "apollo-server-express";
import  {typeDefs}  from "./graphql/schema/index.js";
import  {resolver}  from "./graphql/resolvers/index.js";

import express from "express";

import dotenv from "dotenv"

dotenv.config;

const app = express();

const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.send("hello from the server side");
});

const server = new ApolloServer({
  // created a instance for the apollo server

 typeDefs,
  resolver,
});


const startServer = async () => {
    await server.start(); // Ensure the server is started before applying middleware
    server.applyMiddleware({ app }); // Apply Apollo Server as middleware to Express app
  
    app.listen(PORT, () => {
      console.log(`Server has been started at port ${PORT}`);
      console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  };
  
  startServer();