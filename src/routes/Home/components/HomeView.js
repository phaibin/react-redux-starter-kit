import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import DocumentTitle from 'react-document-title'

export const HomeView = () => (
  <DocumentTitle title='Home'>
    <div>
      <h4>Welcome!</h4>
      <img
        alt='This is a duck, because Redux!'
        className='duck'
        src={DuckImage} />
    </div>
  </DocumentTitle>
)

export default HomeView
