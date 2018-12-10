import * as React from 'react';
import { Button, List } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { updateTodo, deleteTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import {
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
  UpdateTodoInput,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  DeleteTodoInput,
} from '../API';
import { TodoListItemProps } from '.';

export const TodoListItem: React.SFC<TodoListItemProps> = ({
  id,
  title,
  completed,
}) => {
  const onUpdateCompleted = (
    updateTodo: any,
    { id, completed }: UpdateTodoInput,
  ) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateTodo({ variables: { input: { id, completed: !completed } } });
  };
  const onDelete = (deleteTodo: any, { id }: DeleteTodoInput) => (
    e: React.SyntheticEvent,
  ) => {
    e.preventDefault();
    deleteTodo({ variables: { input: { id } } });
  };
  return (
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
            mutation={gql(updateTodo)}
            refetchQueries={[{ query: gql(listTodos) }]}
          >
            {(updateTodo, { data }) => (
              <Button
                size="small"
                type={completed ? 'primary' : 'default'}
                icon="check"
                style={{ marginRight: '0.5rem' }}
                onClick={onUpdateCompleted(updateTodo, { id, completed })}
              />
            )}
          </Mutation>
          {title}
        </div>

        <div>
          <Mutation<DeleteTodoMutation, DeleteTodoMutationVariables>
            mutation={gql(deleteTodo)}
            refetchQueries={[{ query: gql(listTodos) }]}
          >
            {(deleteTodo, { data }) => (
              <Button
                size="small"
                type="default"
                shape="circle"
                icon="delete"
                onClick={onDelete(deleteTodo, { id })}
              />
            )}
          </Mutation>
        </div>
      </div>
    </List.Item>
  );
};
