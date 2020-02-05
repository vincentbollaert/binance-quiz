import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import { UNIT_LG_INT } from '../styles'
import reset from '../styles/reset'
import Home from '../pages/Home/component'

export const CLASSNAME_APPLICATION = 'application'
const GlobalStyle = createGlobalStyle`
  ${reset};
`

const STYLE_HEADER_HEIGHT_INT = 6.4
const STYLE_PAGE_MARGIN = `${STYLE_HEADER_HEIGHT_INT + UNIT_LG_INT}rem} auto 0`

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${STYLE_HEADER_HEIGHT_INT}rem;
  background-color: #202020;
`
const PageWrap = styled.div`
  margin: ${STYLE_PAGE_MARGIN};
  padding: 32px;
  max-width: 1140px;
  background-color: #353535;
`

const Application = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <PageWrap>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </PageWrap>
    </>
  )
}

export default Application
