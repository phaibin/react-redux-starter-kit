import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import DocumentTitle from 'react-document-title'

export const HomeView = () => (
  <DocumentTitle title='404'>
    <div>
      <h4>404!</h4>
    </div>
  </DocumentTitle>
)

export default HomeView
