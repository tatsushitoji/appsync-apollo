import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Layout, Input, Form, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { createTodo } from '../graphql/mutations';
import { CreateTodoMutation, CreateTodoMutationVariables } from '../API';
import { GET_LIST_TODOS_QUERY } from '.';

export const CREATE_TODO_MUTATION = gql(createTodo);

const TodoFormComponent: React.SFC<FormComponentProps> = ({
  form: { getFieldDecorator, getFieldValue, resetFields },
}) => (
  <Mutation<CreateTodoMutation, CreateTodoMutationVariables>
    mutation={CREATE_TODO_MUTATION}
    refetchQueries={[{ query: GET_LIST_TODOS_QUERY }]}
  >
    {(createTodo, { data }) => {
      // console.log(data);
      const onSubmit = (e: React.FormEvent) => {
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
      return (
        <Form layout="inline" style={{ width: '100%' }} onSubmit={onSubmit}>
          <Layout style={{ flexDirection: 'row' }}>
            {getFieldDecorator('title', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(<Input placeholder="Input ToDo" name="title" />)}
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '.5rem' }}
              disabled={!getFieldValue('title')}
            >
              SUBMIT
            </Button>
          </Layout>
        </Form>
      );
    }}
  </Mutation>
);

export const TodoForm = Form.create()(TodoFormComponent);
