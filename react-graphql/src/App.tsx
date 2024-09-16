import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Route,  } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";

import Auth from "./components/Auth";
import Main from "./components/Main";

import styles from './App.module.css';

const apolloClient = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
  headers: {
    authorization: localStorage.getItem("token") ? `JWT ${localStorage.getItem("token")}` : "",
  },
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={apolloClient}>
        <div className={styles.App}>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Auth} />
              <Route path="/employees" Component={Main} />
            </Routes>
          </BrowserRouter>
        </div>
      </ApolloProvider>
  );
}

export default App;
