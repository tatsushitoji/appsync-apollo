import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

import { Todo, GET_LIST_TODOS_QUERY } from '.';

it('should render Todo List', async () => {
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
              title: 'todo1',
              completed: false,
              created: '1544594653658',
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

  new Promise(resolve => resolve); // wait for response
  wrapper.update(); // apply re-render
  expect(wrapper.find('.ant-list-item')).toBeTruthy();
});
