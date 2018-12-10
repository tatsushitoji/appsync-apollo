import * as React from 'react';
import { Layout } from 'antd';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { listTodos } from '../graphql/queries';
import { createTodo } from '../graphql/mutations';
import {
  ListTodosQuery,
  CreateTodoMutation,
  CreateTodoMutationVariables,
} from '../API';

import { TodoForm, TodoList } from '.';

export const Todo = () => (
  <Layout style={{ alignItems: 'center', display: 'flex', minHeight: '100vh' }}>
    <h1>TODO</h1>
    <Layout
      style={{
        maxWidth: '480px',
        minWidth: '480px',
        flexGrow: 0,
      }}
    >
      <Layout style={{ flexDirection: 'row', marginBottom: '1rem' }}>
        <Mutation<CreateTodoMutation, CreateTodoMutationVariables>
          mutation={gql(createTodo)}
          refetchQueries={[{ query: gql(listTodos) }]}
        >
          {(createTodo, { data }) => <TodoForm createTodo={createTodo} />}
        </Mutation>
      </Layout>
      <Layout>
        <Query<ListTodosQuery, {}> query={gql(listTodos)}>
          {({ data, loading, error }) => {
            if (error || loading) {
              return <p>{error ? `Error! ${error}` : 'loading...'}</p>;
            }
            if (data && data.listTodos) {
              return <TodoList listTodos={data.listTodos} />;
            }
          }}
        </Query>
      </Layout>
    </Layout>
  </Layout>
);
