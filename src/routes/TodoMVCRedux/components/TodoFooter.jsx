import React from 'react'
import * as Utils from '../modules/utils'
import * as Constants from './constants'
import classNames from 'classNames'

const FILTER_TITLES = {
  [Constants.ALL_TODOS]: 'All',
  [Constants.ACTIVE_TODOS]: 'Active',
  [Constants.COMPLETED_TODOS]: 'Completed'
}

const TodoFooter = (props) => {
  var activeTodoWord = Utils.pluralize(props.count, 'item')
  var clearButton = null

  if (props.completedCount > 0) {
    clearButton = (
      <button className='clear-completed' onClick={props.onClearCompleted}>
        Clear completed
      </button>
    )
  }

  var nowShowing = props.nowShowing
  return (
    <footer className='footer'>
      <span className='todo-count'><strong>{props.count}</strong> {activeTodoWord} left</span>
      <ul className='filters'>
        {[ Constants.ALL_TODOS, Constants.ACTIVE_TODOS, Constants.COMPLETED_TODOS ].map(filter =>
          <li key={filter}>
            <a className={classNames({ selected: nowShowing === filter })}
              onClick={() => props.onShow(filter)}>{FILTER_TITLES[filter]}</a>
          </li>
        )}
      </ul>
      {clearButton}
    </footer>
  )
}

TodoFooter.propTypes = {
  count: React.PropTypes.number.isRequired,
  completedCount: React.PropTypes.number.isRequired,
  nowShowing: React.PropTypes.string.isRequired,
  onClearCompleted: React.PropTypes.func.isRequired
}

export default TodoFooter
