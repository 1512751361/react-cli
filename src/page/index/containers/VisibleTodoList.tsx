import { connect } from 'react-redux';
import { toggleTodo, namespace } from '../actions';
import TodoList from '../components/TodoList';

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

const mapStateToProps = (state: any): { todos: any[] } => ({
  todos: getVisibleTodos(state[namespace].todos, state[namespace].visibilityFilter),
});

interface TDispatchProps {
  onTodoClick: (id: number) => void;
}

const mapDispatchToProps = (dispatch: any): TDispatchProps => ({
  onTodoClick: (id: number) => {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = connect<
  {
    todos: any[];
  },
  TDispatchProps,
  any
>(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;
