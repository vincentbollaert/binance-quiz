import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import Home from '../pages/Home/component'

export const CLASSNAME_APPLICATION = 'application'
const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Open Sans', sans-serif;
    color: #444;
    overflow: hidden;
  }
`

const Application = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </>
  )
}

export default Application
