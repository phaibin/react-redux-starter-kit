import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
import React, { Component } from 'react'
import * as Constants from './constants'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
import DocumentTitle from 'react-document-title'

var ENTER_KEY = 13

class TodoApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nowShowing: Constants.ALL_TODOS,
      editing: null,
      newTodo: ''
    }
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value })
  }

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return
    }

    event.preventDefault()

    var val = this.state.newTodo.trim()

    if (val) {
      this.props.addTodo(val)
      this.setState({ newTodo: '' })
    }
  }

  edit = (todo) => {
    this.setState({ editing: todo.id })
  }

  save = (id, text) => {
    this.props.saveTodo(id, text)
    this.setState({ editing: null })
  }

  cancel = () => {
    this.setState({ editing: null })
  }

  handleShow = nowShowing => {
    this.setState({ nowShowing })
  }

  render () {
    var footer
    var main
    var todos = this.props.todos

    var shownTodos = todos.filter(function (todo) {
      switch (this.state.nowShowing) {
        case Constants.ACTIVE_TODOS:
          return !todo.completed
        case Constants.COMPLETED_TODOS:
          return todo.completed
        default:
          return true
      }
    }, this)

    var todoItems = shownTodos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => this.props.toggleTodo(todo.id)}
          onDestroy={() => this.props.deleteTodo(todo.id)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this)}
          onCancel={this.cancel} />
      )
    }, this)

    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1
    }, 0)

    var completedCount = todos.length - activeTodoCount

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onShow={this.handleShow.bind(this)}
          onClearCompleted={this.props.clearCompleted} />
    }

    if (todos.length) {
      main = (
        <section className='main'>
          <input
            className='toggle-all'
            type='checkbox'
            onChange={this.props.toggleAll}
            checked={activeTodoCount === 0} />
          <ul className='todo-list'>
            {todoItems}
          </ul>
        </section>
      )
    }

    return (
      <DocumentTitle title='TodoMVC'>
        <div>
          <section className='todoapp'>
            <div>
              <header className='header'>
                <h1>todos</h1>
                <input
                  className='new-todo'
                  placeholder='What needs to be done?'
                  value={this.state.newTodo}
                  onKeyDown={this.handleNewTodoKeyDown}
                  onChange={this.handleChange}
                  autoFocus />
              </header>
              {main}
              {footer}
            </div>
          </section>
          <footer className='info'>
            <p>
              Double-click to edit a todo
            </p>
            <p>
              Created by <a href='http://github.com/petehunt/'>petehunt</a>
            </p>
            <p>
              Part of <a href='http://todomvc.com'>TodoMVCReact</a>
            </p>
          </footer>
        </div>
      </DocumentTitle>
    )
  }
}

TodoApp.propTypes = {
  todos: React.PropTypes.array.isRequired,
  addTodo: React.PropTypes.func.isRequired,
  toggleTodo: React.PropTypes.func.isRequired,
  deleteTodo: React.PropTypes.func.isRequired,
  saveTodo: React.PropTypes.func.isRequired,
  clearCompleted: React.PropTypes.func.isRequired,
  toggleAll: React.PropTypes.func.isRequired
}

export default TodoApp
