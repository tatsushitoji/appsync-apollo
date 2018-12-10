import * as React from 'react';
import { MutationFn } from 'react-apollo';
import { Layout, Input, Form, Button, List } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  CreateTodoInput,
} from '../API';

interface TodoFormProps extends FormComponentProps {
  createTodo: MutationFn<CreateTodoMutation, CreateTodoMutationVariables>;
}

const TodoFormComponent: React.SFC<TodoFormProps> = ({
  form: { getFieldDecorator, getFieldValue, resetFields },
  createTodo,
}) => {
  const onSubmit = (todoInput: CreateTodoInput) => (e: React.FormEvent) => {
    e.preventDefault();
    createTodo({ variables: { input: todoInput } });
    resetFields(['title']);
  };
  return (
    <Form
      layout="inline"
      style={{ width: '100%' }}
      onSubmit={onSubmit({
        title: getFieldValue('title'),
        created: `${Date.now()}`,
        completed: false,
      })}
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

export const TodoForm = Form.create()(TodoFormComponent);
