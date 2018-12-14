import * as React from 'react';
import { Button } from 'antd';

interface Props {
  loading: boolean;
  onClick: (_: React.SyntheticEvent) => void;
}

export const TodoListDeleteButton: React.SFC<Props> = ({
  loading,
  onClick,
}) => (
  <Button
    size="small"
    type="default"
    shape="circle"
    icon="delete"
    loading={loading}
    onClick={onClick}
  />
);
