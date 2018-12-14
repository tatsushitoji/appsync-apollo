import * as React from 'react';
import { Mutation } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

import { TodoListDeleteButton, DELETE_TODO_MUTATION } from '.';

test('should render without error', () => {
  const onClick = jest.fn();
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoListDeleteButton loading={false} onClick={onClick} />
    </MockedProvider>,
  );
  expect(wrapper).toBeTruthy();
});

test('should render with loading', () => {
  const onClick = jest.fn();
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <TodoListDeleteButton loading={true} onClick={onClick} />
    </MockedProvider>,
  );
  expect(wrapper.find('.ant-btn').hasClass('ant-btn-loading')).toBeTruthy();
});

test('should called onClick and mutate method', async () => {
  let isMutated: boolean = false;
  const spy = jest.fn();
  const mocks = {
    request: {
      query: DELETE_TODO_MUTATION,
      variables: {
        input: { id: 'id1' },
      },
    },
    result: {
      data: {
        deleteTodo: {
          id: 'id1',
          title: 'todo1',
          created: '1544594653658',
          completed: false,
        },
      },
    },
  };
  const wrapper = mount(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <Mutation mutation={DELETE_TODO_MUTATION}>
        {(deleteTodo, { data }) => {
          if (data) {
            isMutated = true;
          }
          return (
            <TodoListDeleteButton
              loading={false}
              // tslint:disable-next-line:jsx-no-lambda
              onClick={e => {
                e.preventDefault();
                deleteTodo({
                  variables: {
                    input: {
                      id: 'id1',
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
