import * as Utils from './utils'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SAVE_TODO = 'SAVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const TOGGLE_ALL = 'TOGGLE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

// ------------------------------------
// Actions
// ------------------------------------
export function addTodo (text) {
  return {
    type: ADD_TODO,
    text
  }
}

export function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export function deleteTodo (id) {
  return {
    type: DELETE_TODO,
    id
  }
}

export function saveTodo (id, text) {
  return {
    type: SAVE_TODO,
    id,
    text
  }
}

export function clearCompleted () {
  return {
    type: CLEAR_COMPLETED
  }
}

export function toggleAll () {
  return {
    type: TOGGLE_ALL
  }
}

export const actions = {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_TODO]: (state, action) => {
    let todo = {
      id: Utils.uuid(),
      title: action.text,
      completed: false
    }
    return ({ ...state, todos: state.todos.concat(todo) })
  },
  [TOGGLE_TODO]: (state, action) => {
    return ({ ...state,
      todos: state.todos.map((todo) => {
        return todo.id !== action.id ? todo : { ...todo, completed: !todo.completed }
      })
    })
  },
  [DELETE_TODO]: (state, action) => {
    return ({ ...state,
      todos: state.todos.filter((todo) => {
        return todo.id !== action.id
      })
    })
  },
  [SAVE_TODO]: (state, action) => {
    return ({ ...state,
      todos: state.todos.map((todo) => {
        return todo.id !== action.id ? todo : { ...todo, title: action.text }
      })
    })
  },
  [CLEAR_COMPLETED]: (state) => {
    return ({ ...state,
      todos: state.todos.filter((todo) => {
        return todo.completed === false
      })
    })
  },
  [TOGGLE_ALL]: (state) => {
    var activeTodoCount = state.todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1
    }, 0)
    return ({ ...state,
      todos: state.todos.map((todo) => {
        return { ...todo, completed: activeTodoCount !== 0 }
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { todos: [] }
export default function todomvcReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
