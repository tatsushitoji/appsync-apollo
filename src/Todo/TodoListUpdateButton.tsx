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
import { GET_LIST_TODOS_QUERY } from '.';

const UPDATE_TODO_MUTATION = gql(updateTodo);

interface Props {
  completed: boolean;
  loading: boolean;
  onClick: (_: React.SyntheticEvent) => void;
}

export const TodoListUpdateButton: React.SFC<Props> = ({
  completed,
  loading,
  onClick,
}) => (
  <Button
    size="small"
    type={completed ? 'primary' : 'default'}
    icon="check"
    style={{ marginRight: '0.5rem' }}
    loading={loading}
    onClick={onClick}
  />
);
