import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

import { Todo, GET_LIST_TODOS_QUERY } from '.';

test('should render Doing Todo List', async () => {
  const TodoMock = {
    request: {
      query: GET_LIST_TODOS_QUERY,
    },
    result: {
      data: {
        listTodos: {
          items: [
            {
              id: 'id1',
              title: 'todooo1',
              completed: false,
              created: '1544594653658',
            },
            {
              id: 'id2',
              title: 'todooo2',
              completed: false,
              created: '1544594653650',
            },
          ],
          nextToken: '',
        },
      },
    },
  };

  const wrapper = mount(
    <MockedProvider mocks={[TodoMock]} addTypename={false}>
      <Todo />
    </MockedProvider>,
  );

  await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
  wrapper.update(); // apply re-render
  expect(
    wrapper
      .find('.ant-spin-container')
      .at(0)
      .children(),
  ).toHaveLength(2);
  expect(
    wrapper
      .find('.ant-spin-container')
      .at(1)
      .children(),
  ).toHaveLength(0);
});

test('should render No data', async () => {
  const TodoMock = {
    request: {
      query: GET_LIST_TODOS_QUERY,
    },
    result: {
      data: {
        listTodos: {
          __typename: 'TodoConnection',
          items: [
            {
              id: 'id1',
              title: 'todooo1',
              completed: true,
              created: '1544594653658',
            },
            {
              id: 'id2',
              title: 'todooo2',
              completed: true,
              created: '1544594653650',
            },
          ],
          nextToken: '',
        },
      },
    },
  };

  const wrapper = mount(
    <MockedProvider mocks={[TodoMock]} addTypename={false}>
      <Todo />
    </MockedProvider>,
  );

  await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
  wrapper.update(); // apply re-render

  expect(
    wrapper
      .find('.ant-spin-container')
      .at(0)
      .children()
      .text(),
  ).toEqual('No data');
  expect(
    wrapper
      .find('.ant-spin-container')
      .at(1)
      .exists(),
  ).toBeFalsy();
});
