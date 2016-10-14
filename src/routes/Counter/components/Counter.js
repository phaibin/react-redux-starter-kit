import React from 'react'
import DocumentTitle from 'react-document-title'

export const Counter = (props) => (
  <DocumentTitle title='Counter'>
    <div style={{ margin: '0 auto' }}>
      <h2>Counter: {props.counter}</h2>
      <button className='btn btn-default' onClick={props.increment}>
        Increment
      </button>
      {' '}
      <button className='btn btn-default' onClick={props.doubleAsync}>
        Double (Async)
      </button>
    </div>
  </DocumentTitle>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
