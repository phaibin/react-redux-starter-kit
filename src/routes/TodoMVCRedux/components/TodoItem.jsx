import React, { Component } from 'React'
import classNames from 'classNames'

var ESCAPE_KEY = 27
var ENTER_KEY = 13

class TodoItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editText: props.todo.title
    }
  }

  handleSubmit = (event) => {
    var val = this.state.editText.trim()
    if (val) {
      this.props.onSave(this.props.todo.id, val)
      this.setState({ editText: val })
    } else {
      this.props.onDestroy()
    }
  }

  handleEdit = () => {
    this.props.onEdit()
    this.setState({ editText: this.props.todo.title })
  }

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title })
      this.props.onCancel(event)
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event)
    }
  }

  handleChange = (event) => {
    if (this.props.editing) {
      this.setState({ editText: event.target.value })
    }
  }

  render () {
    let element
    if (this.props.editing) {
      element = (
        <input
          className='edit'
          autoFocus='true'
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
      )
    } else {
      element = (
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={this.props.todo.completed}
            onChange={() => this.props.onToggle(this.props.todo)} />
          <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button className='destroy' onClick={this.props.onDestroy} />
        </div>
      )
    }
    return (
      <li className={classNames({ completed: this.props.todo.completed, editing: this.props.editing })}>
        {element}
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  editing: React.PropTypes.bool.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  onDestroy: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
}

export default TodoItem
