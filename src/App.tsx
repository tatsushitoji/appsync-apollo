import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const ListTodos = gql`
  query getTodolist {
    listSimpleTodos {
      items {
        id
        title
        created_at
        completed
      }
    }
  }
`;

const App = (props: any) => {
  console.log(props);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default compose(
  graphql(ListTodos, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      todos:
        props.data && (props.data as any).listSimpleTodos
          ? props.data && (props.data as any).listSimpleTodos.items
          : [],
    }),
  }),
)(App);
