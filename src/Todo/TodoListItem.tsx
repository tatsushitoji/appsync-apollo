import * as React from 'react';
import { Button, List } from 'antd';
import { TodoListItemProps } from '.';

export const TodoListItem: React.SFC<TodoListItemProps> = ({
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
      {title}
      <Button
        size="small"
        type={completed ? 'primary' : 'default'}
        shape="circle"
        icon="check"
      />
    </div>
  </List.Item>
);
