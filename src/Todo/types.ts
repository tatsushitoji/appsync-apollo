import { ListTodosQuery } from '../API';

export interface TodoListItemProps {
  id: string;
  title: string;
  created: string;
  completed: boolean;
}

export type TodoListProps = {
  listTodos: NonNullable<ListTodosQuery['listTodos']>;
};

// export type TodoListProps {
//   listTodos: NonNullable<NonNullableListTodos['items']>;
// }
