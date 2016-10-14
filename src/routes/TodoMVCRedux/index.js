import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'todomvcredux',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const TodoMVC = require('./containers/TodoMVCContainer').default
      const reducer = require('./modules/todomvc').default

      /*  Add the reducer to the store on key 'zen'  */
      injectReducer(store, { key: 'todomvc', reducer })

      /*  Return getComponent   */
      cb(null, TodoMVC)

    /* Webpack named bundle   */
    }, 'todomvcredux')
  }
})
