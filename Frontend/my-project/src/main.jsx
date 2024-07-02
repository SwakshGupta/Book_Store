import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8003/graphql',
});

const authLink = setContext((_, { headers }) => {
  const apiKey = 181914722195266

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${apiKey}`,
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// 
//The setContext function in Apollo Client is used to set the context for an Apollo Link operation, 
//typically for adding authentication information or other headers to outgoing GraphQL requests. 