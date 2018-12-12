import * as React from 'react';
import { Layout, Tabs } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { listTodos } from '../graphql/queries';
import { ListTodosQuery, ListTodosQueryVariables } from '../API';

import { TodoForm, TodoList } from '.';

export const GET_LIST_TODOS_QUERY = gql(listTodos);

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
        <TodoForm />
      </Layout>
      <Layout>
        <Query<ListTodosQuery, ListTodosQueryVariables>
          query={GET_LIST_TODOS_QUERY}
          fetchPolicy="cache-and-network"
        >
          {({ data, loading, error }) => {
            if (error || loading) {
              return <p>{error ? `Error! ${error}` : 'loading...'}</p>;
            }
            if (data) {
              return (
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="DOING" key="1">
                    <TodoList listTodos={data.listTodos!} isDone={false} />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="DONE" key="2">
                    <TodoList listTodos={data.listTodos!} isDone />
                  </Tabs.TabPane>
                </Tabs>
              );
            }
          }}
        </Query>
      </Layout>
    </Layout>
  </Layout>
);
