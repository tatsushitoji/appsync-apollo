import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

import { TodoListItem } from '.';

test('should render ListItem', async () => {
  const mockItem = {
    id: 'id1',
    title: 'todo1',
    completed: false,
    created: '1544594653658',
  };
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoListItem
        id={mockItem.id}
        title={mockItem.title}
        completed={mockItem.completed}
        created={mockItem.created}
      />
    </MockedProvider>,
  );
  expect(wrapper.find('.ant-list-item')).toBeTruthy();
});

test('should render Doing Todo ListItem', async () => {
  const mockItem = {
    id: 'id1',
    title: 'todo1',
    completed: false,
    created: '1544594653658',
  };
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoListItem
        id={mockItem.id}
        title={mockItem.title}
        completed={mockItem.completed}
        created={mockItem.created}
      />
    </MockedProvider>,
  );
  expect(
    wrapper
      .find('.ant-btn')
      .first()
      .hasClass('ant-btn-primary'),
  ).toBeFalsy();
});

test('should render Done Todo ListItem', async () => {
  const mockItem = {
    id: 'id1',
    title: 'todo1',
    completed: true,
    created: '1544594653658',
  };
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoListItem
        id={mockItem.id}
        title={mockItem.title}
        completed={mockItem.completed}
        created={mockItem.created}
      />
    </MockedProvider>,
  );
  expect(
    wrapper
      .find('.ant-btn')
      .first()
      .hasClass('ant-btn-primary'),
  ).toBeTruthy();
});
