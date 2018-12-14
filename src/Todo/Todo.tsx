import * as React from 'react';
import { Layout, Tabs } from 'antd';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { FormComponentProps } from 'antd/lib/form';
import { listTodos } from '../graphql/queries';
import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  ListTodosQuery,
  ListTodosQueryVariables,
} from '../API';
import { createTodo } from '../graphql/mutations';

export const CREATE_TODO_MUTATION = gql(createTodo);
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
        <Mutation<CreateTodoMutation, CreateTodoMutationVariables>
          mutation={CREATE_TODO_MUTATION}
          refetchQueries={[{ query: GET_LIST_TODOS_QUERY }]}
        >
          {(createTodo, { data }) => {
            // console.log(data);
            const onSubmit = ({
              getFieldValue,
              resetFields,
            }: FormComponentProps['form']) => (e: React.FormEvent) => {
              e.preventDefault();
              createTodo({
                variables: {
                  input: {
                    title: getFieldValue('title').trim(),
                    created: `${Date.now()}`,
                    completed: false,
                  },
                },
              });
              resetFields(['title']);
            };
            return <TodoForm onSubmit={onSubmit} />;
          }}
        </Mutation>
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
