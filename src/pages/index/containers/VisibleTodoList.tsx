import reduxComponent from '@src/common/redux/connect';
import { namespace, TOGGLE_TODO } from '../actions';
import TodoList from '../components/TodoList';
import { ModelState, TodoItem } from '../reducer';

const getVisibleTodos = (todos: any[], filter: string): any[] => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
};

interface TDispatchProps {
  onTodoClick: (id: number) => void;
}

const VisibleTodoList = reduxComponent<ModelState, { todos: TodoItem[] }, TDispatchProps>(
  namespace,
  (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  }),
  ({ emit }) => ({
    onTodoClick: (id: number) => emit(TOGGLE_TODO, { id }),
  }),
)(TodoList);

export default VisibleTodoList;
