import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions/types'
import { createReducer } from '@util/reduxUtil'

const { SHOW_ALL } = VisibilityFilters

export function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: parseInt(Math.random()*1000)
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}
const reducer = createReducer(
  {
    todos: [],
    visibilityFilter: SHOW_ALL
  },
  {
    [SET_VISIBILITY_FILTER]: (state = SHOW_ALL, action)=>({...state,...action.payload}),
    [ADD_TODO]: (state=[],action)=>([...state,{
      text: action.text,
      completed: false,
      id: parseInt(Math.random()*1000)
    }]),
    [TOGGLE_TODO]: (state=[],action) => state.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        })
      }
      return todo
    })
  }
);

export default reducer;