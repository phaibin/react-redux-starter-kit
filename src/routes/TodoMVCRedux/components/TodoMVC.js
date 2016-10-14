import React, { Component } from 'react'
import './HomeView.scss'
import TodoApp from './TodoApp'
import TodoModel from './TodoModel'
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

class TodoMVCReact extends Component {

  constructor (props) {
    super(props)
    var model = new TodoModel('react-todos')
    model.subscribe(this.forceUpdate.bind(this))
    this.state = {
      model
    }
  }

  render () {
    return (
      <div>
        <section className='todoapp'>
          <TodoApp model={this.state.model} />
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
    )
  }
}

export default TodoMVCReact
