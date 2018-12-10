import * as React from 'react';
import { List } from 'antd';
import { TodoListItem, TodoListProps } from '.';

export const TodoList: React.SFC<TodoListProps> = ({
  listTodos: { items },
}) => (
  <List size="large" bordered dataSource={items} renderItem={TodoListItem} />
);
