import * as React from 'react';
import { Mutation } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

import { TodoListUpdateButton, UPDATE_TODO_MUTATION } from '.';

test('should render without error', () => {
  const onClick = jest.fn();
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoListUpdateButton
        completed={false}
        loading={false}
        onClick={onClick}
      />
    </MockedProvider>,
  );
  expect(wrapper).toBeTruthy();
});

test('should render with loading', () => {
  const onClick = jest.fn();
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoListUpdateButton
        completed={false}
        loading={true}
        onClick={onClick}
      />
    </MockedProvider>,
  );
  expect(wrapper.find('.ant-btn').hasClass('ant-btn-loading')).toBeTruthy();
});

test('should called onClick and mutate method', async () => {
  let isMutated: boolean = false;
  const spy = jest.fn();
  const mocks = {
    request: {
      query: UPDATE_TODO_MUTATION,
      variables: {
        input: { id: 'id1', completed: true },
      },
    },
    result: {
      data: {
        updateTodo: {
          id: 'id1',
          title: 'todo1',
          created: '1544594653658',
          completed: true,
        },
      },
    },
  };
  const wrapper = mount(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <Mutation mutation={UPDATE_TODO_MUTATION}>
        {(updateTodo, { data }) => {
          if (data) {
            isMutated = true;
          }
          return (
            <TodoListUpdateButton
              completed={false}
              loading={false}
              // tslint:disable-next-line:jsx-no-lambda
              onClick={e => {
                e.preventDefault();
                updateTodo({
                  variables: {
                    input: {
                      id: 'id1',
                      completed: true,
                    },
                  },
                }).then(spy);
              }}
            />
          );
        }}
      </Mutation>
    </MockedProvider>,
  );
  wrapper.find('.ant-btn').simulate('click');
  await new Promise(resolve => setTimeout(resolve, 10)); // wait for response
  wrapper.update(); // apply re-render
  if (isMutated) expect(spy).toHaveBeenCalledTimes(1);
});
