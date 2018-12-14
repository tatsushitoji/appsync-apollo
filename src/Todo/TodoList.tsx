import * as React from 'react';
import { List } from 'antd';
import { TodoListItem, TodoListProps } from '.';

type Props = TodoListProps & {
  isDone: boolean;
};

export const TodoList: React.SFC<Props> = ({
  listTodos: { items },
  isDone,
}) => {
  const dataSource = isDone
    ? items!.filter(item => item!.completed)
    : items!.filter(item => !item!.completed);
  return (
    <List
      size="large"
      bordered
      dataSource={dataSource}
      renderItem={TodoListItem}
    />
  );
};
