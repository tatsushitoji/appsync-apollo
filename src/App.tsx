import React, { Component } from 'react';
import { Layout, Input, Form, Button, List } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { listTodos } from './graphql/queries';
import { createTodo } from './graphql/mutations';
import {
  ListTodosQuery,
  CreateTodoMutation,
  CreateTodoMutationVariables,
  CreateTodoInput,
} from './API';

interface TodoItem {
  id: string;
  title: string;
  created: string;
  completed: boolean;
}

interface TodoFormProps extends FormComponentProps {
  onSubmit: any;
}

const TodoForm: React.SFC<TodoFormProps> = ({
  form: { getFieldDecorator, getFieldValue, resetFields },
  onSubmit,
}) => {
  return (
    <Form
      layout="inline"
      style={{ width: '100%' }}
      // tslint:disable-next-line  jsx-no-lambda
      onSubmit={onSubmit(
        {
          title: getFieldValue('title'),
          created: `${Date.now()}`,
          completed: false,
        },
        resetFields,
      )}
    >
      <Layout style={{ flexDirection: 'row' }}>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input placeholder="Input ToDo" name="title" />)}
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: '.5rem' }}
        >
          SUBMIT
        </Button>
      </Layout>
    </Form>
  );
};

const WrappedTodoForm = Form.create()(TodoForm);

const App = () => {
  return (
    <div className="App">
      <Layout
        style={{ alignItems: 'center', display: 'flex', height: '100vh' }}
      >
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
              {(createTodo, { data }) => {
                // TODO: avoid any
                const onSubmit = (todoInput: CreateTodoInput, Fn: any) => (
                  e: React.FormEvent,
                ) => {
                  e.preventDefault();
                  createTodo({ variables: { input: todoInput } });
                  Fn(['title']);
                };
                return <WrappedTodoForm onSubmit={onSubmit} />;
              }}
            </Mutation>
          </Layout>
          <Layout>
            <Query<ListTodosQuery, {}> query={gql(listTodos)}>
              {({ data, loading, error }) => {
                if (error || loading) {
                  return <p>{error ? `Error! ${error}` : 'loading...'}</p>;
                }
                if (data && data.listTodos) {
                  return (
                    <List
                      size="large"
                      bordered
                      dataSource={data.listTodos.items}
                      // tslint:disable-next-line  jsx-no-lambda
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
                }
              }}
            </Query>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
