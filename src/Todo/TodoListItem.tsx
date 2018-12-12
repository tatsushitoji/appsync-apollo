import * as React from 'react';
import { Button, List } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { updateTodo, deleteTodo } from '../graphql/mutations';
import {
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
  UpdateTodoInput,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  DeleteTodoInput,
} from '../API';
import { TodoListItemProps, REFETCH_LIST_TODOS_QUERY } from '.';

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
          refetchQueries={[{ query: REFETCH_LIST_TODOS_QUERY }]}
        >
          {(updateTodo, { loading }) => {
            const onUpdateCompleted = ({ id, completed }: UpdateTodoInput) => (
              e: React.SyntheticEvent,
            ) => {
              e.preventDefault();
              updateTodo({
                variables: { input: { id, completed: !completed } },
              });
            };
            return (
              <Button
                size="small"
                type={completed ? 'primary' : 'default'}
                icon="check"
                style={{ marginRight: '0.5rem' }}
                loading={loading}
                onClick={onUpdateCompleted({ id, completed })}
              />
            );
          }}
        </Mutation>
        {title}
      </div>

      <div>
        <Mutation<DeleteTodoMutation, DeleteTodoMutationVariables>
          mutation={DELETE_TODO_MUTATION}
          refetchQueries={[{ query: REFETCH_LIST_TODOS_QUERY }]}
        >
          {(deleteTodo, { loading }) => {
            const onDelete = ({ id }: DeleteTodoInput) => (
              e: React.SyntheticEvent,
            ) => {
              e.preventDefault();
              deleteTodo({ variables: { input: { id } } });
            };
            return (
              <Button
                size="small"
                type="default"
                shape="circle"
                icon="delete"
                loading={loading}
                onClick={onDelete({ id })}
              />
            );
          }}
        </Mutation>
      </div>
    </div>
  </List.Item>
);
