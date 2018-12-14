import * as React from 'react';
import { List } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { updateTodo, deleteTodo } from '../graphql/mutations';
import {
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
} from '../API';
import {
  TodoListUpdateButton,
  TodoListDeleteButton,
  TodoListItemProps,
  GET_LIST_TODOS_QUERY,
} from '.';

const UPDATE_TODO_MUTATION = gql(updateTodo);
const DELETE_TODO_MUTATION = gql(deleteTodo);

export const TodoListItem: React.SFC<TodoListItemProps> = ({
  id,
  title,
  completed,
}) => (
  <List.Item>
    <div
      style={{
        textAlign: 'left',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Mutation<UpdateTodoMutation, UpdateTodoMutationVariables>
          mutation={UPDATE_TODO_MUTATION}
          refetchQueries={[{ query: GET_LIST_TODOS_QUERY }]}
        >
          {(updateTodo, { loading }) => {
            const onClick = (e: React.SyntheticEvent) => {
              e.preventDefault();
              updateTodo({
                variables: { input: { id, completed: !completed } },
              });
            };
            return (
              <TodoListUpdateButton
                completed={completed}
                loading={loading}
                onClick={onClick}
              />
            );
          }}
        </Mutation>

        {title}
      </div>
      <div>
        <Mutation<DeleteTodoMutation, DeleteTodoMutationVariables>
          mutation={DELETE_TODO_MUTATION}
          refetchQueries={[{ query: GET_LIST_TODOS_QUERY }]}
        >
          {(deleteTodo, { loading }) => {
            const onClick = (e: React.SyntheticEvent) => {
              e.preventDefault();
              deleteTodo({ variables: { input: { id } } });
            };
            return <TodoListDeleteButton loading={loading} onClick={onClick} />;
          }}
        </Mutation>
      </div>
    </div>
  </List.Item>
);
