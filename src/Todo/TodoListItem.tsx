import * as React from 'react';
import { List } from 'antd';
import {
  TodoListUpdateButton,
  TodoListDeleteButton,
  TodoListItemProps,
} from '.';

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
        <TodoListUpdateButton id={id} completed={completed} />
        {title}
      </div>

      <div>
        <TodoListDeleteButton id={id} />
      </div>
    </div>
  </List.Item>
);
