import React, { Component } from 'react';
import { Layout, Input, Button, List } from 'antd';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { listSimpleTodos } from './graphql/queries';
import { ListSimpleTodosQuery } from './API';

interface TodoItem {
  id: string;
  title: string;
  created_at: string;
  completed: boolean;
}

const App = () => (
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
          <Query<ListSimpleTodosQuery, {}> query={gql(listSimpleTodos)}>
            {({ data, loading, error }) => {
              if (error || loading) {
                return <p>{error ? `Error! ${error}` : 'loading...'}</p>;
              }
              if (data && data.listSimpleTodos)
                return (
                  <List
                    size="large"
                    bordered
                    dataSource={data.listSimpleTodos.items}
                    // tslint:disable-next-line
                    renderItem={(item: TodoItem) => (
                      <List.Item>
                        <div
                          style={{
                            textAlign: 'left',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {item.title}
                          <Button
                            size="small"
                            type={item.completed ? 'primary' : 'default'}
                            shape="circle"
                            icon="check"
                          />
                        </div>
                      </List.Item>
                    )}
                  />
                );
            }}
          </Query>
        </Layout>
      </Layout>
    </Layout>
  </div>
);

export default App;
