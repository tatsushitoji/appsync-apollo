import * as React from 'react';
import { Button } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { updateTodo } from '../graphql/mutations';
import {
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
  UpdateTodoInput,
} from '../API';
import { REFETCH_LIST_TODOS_QUERY } from '.';

const UPDATE_TODO_MUTATION = gql(updateTodo);

interface Props {
  id: string;
  completed: boolean;
}

export const TodoListUpdateButton: React.SFC<Props> = ({ id, completed }) => (
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
);
