import * as React from 'react';
import { Button } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { deleteTodo } from '../graphql/mutations';
import {
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  DeleteTodoInput,
} from '../API';
import { GET_LIST_TODOS_QUERY } from '.';

const DELETE_TODO_MUTATION = gql(deleteTodo);

interface Props {
  id: string;
}

export const TodoListDeleteButton: React.SFC<Props> = ({ id }) => (
  <Mutation<DeleteTodoMutation, DeleteTodoMutationVariables>
    mutation={DELETE_TODO_MUTATION}
    refetchQueries={[{ query: GET_LIST_TODOS_QUERY }]}
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
);
