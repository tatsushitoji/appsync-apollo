import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

import { ListTodosQuery } from '../API';
import { TodoList } from '.';

test('should render Doing Todo List', async () => {
  const listTodos: ListTodosQuery['listTodos'] = {
    __typename: 'TodoConnection',
    items: [
      {
        __typename: 'Todo',
        id: 'id1',
        title: 'todooo1',
        completed: false,
        created: '1544594653658',
      },
      {
        __typename: 'Todo',
        id: 'id2',
        title: 'todooo2',
        completed: false,
        created: '1544594653650',
      },
    ],
    nextToken: '',
  };
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoList listTodos={listTodos} isDone={false} />
    </MockedProvider>,
  );
  expect(wrapper.find('.ant-spin-container').children()).toHaveLength(2);
});

test('should render Done Todo List', async () => {
  const listTodos: ListTodosQuery['listTodos'] = {
    __typename: 'TodoConnection',
    items: [
      {
        __typename: 'Todo',
        id: 'id1',
        title: 'todooo1',
        completed: true,
        created: '1544594653658',
      },
    ],
    nextToken: '',
  };
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoList listTodos={listTodos} isDone />
    </MockedProvider>,
  );
  expect(wrapper.find('.ant-spin-container').children()).toHaveLength(1);
});
