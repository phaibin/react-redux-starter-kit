import React from 'react'
import './Zen.scss'
import DocumentTitle from 'react-document-title'

export const Zen = (props) => (
  <DocumentTitle title='Zen'>
    <div>
      <div>
        <h2 className='zenHeader'>
          {props.zen ? props.zen.value : ''}
        </h2>
        <button className='btn btn-default' onClick={props.fetchZen}>
          Fetch a wisdom
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.saveCurrentZen}>
          Save
        </button>
      </div>
      {props.saved.length
        ? <div className='savedWisdoms'>
          <h3>Saved wisdom</h3>
          <ul>
            {props.saved.map(zen =>
              <li key={zen.id}>{zen.value}</li>
            )}
          </ul>
        </div>
      : null}
    </div>
  </DocumentTitle>
)

Zen.propTypes = {
  zen     : React.PropTypes.object,
  saved: React.PropTypes.array.isRequired,
  fetchZen : React.PropTypes.func.isRequired,
  saveCurrentZen   : React.PropTypes.func.isRequired
}

export default Zen
