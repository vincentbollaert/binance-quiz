import React from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Application from '../component'

const history = createBrowserHistory()

const Root = () => (
  <Router history={history}>
    <Route
      path="/"
      render={props => <Application {...props} />}
    />
  </Router>
)

export default Root
