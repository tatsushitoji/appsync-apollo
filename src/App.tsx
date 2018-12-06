import React, { Component } from 'react';
import { Layout, Input, Button, List } from 'antd';

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const App = (props: any) => (
  <div className="App">
    <Layout style={{ alignItems: 'center', display: 'flex', height: '100vh' }}>
      <h1>TODO</h1>
      <Layout
        style={{
          maxWidth: '480px',
          minWidth: '480px',
          flexGrow: 0,
        }}
      >
        <Layout style={{ flexDirection: 'row', marginBottom: '1rem' }}>
          <Input placeholder="Input ToDo" />
          <Button type="primary" style={{ marginLeft: '.5rem' }}>
            SUBMIT
          </Button>
        </Layout>
        <Layout>
          <List
            className="App-todos"
            size="large"
            bordered
            dataSource={props.todos}
            // tslint:disable-next-line
            renderItem={(todo: any) => (
              <List.Item>
                <div
                  style={{
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {todo.title}
                  <Button
                    size="small"
                    type={todo.completed ? 'primary' : 'default'}
                    shape="circle"
                    icon="check"
                  />
                </div>
              </List.Item>
            )}
          />
        </Layout>
      </Layout>
    </Layout>
  </div>
);

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
