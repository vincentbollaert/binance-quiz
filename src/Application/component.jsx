import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import { media, UNIT_LG_INT, UNIT_LG } from '../styles'
import reset from '../styles/reset'
import Home from '../pages/Home/component'

export const CLASSNAME_APPLICATION = 'application'
const GlobalStyle = createGlobalStyle`
  ${reset};
`

const STYLE_HEADER_HEIGHT_INT = 4.4
const STYLE_HEADER_HEIGHT_SM_INT = 6.4
const STYLE_PAGE_MARGIN = `${STYLE_HEADER_HEIGHT_INT + UNIT_LG_INT}rem auto 0`
const STYLE_PAGE_MARGIN_SM = `${STYLE_HEADER_HEIGHT_SM_INT + UNIT_LG_INT}rem auto 0`

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${STYLE_HEADER_HEIGHT_INT}rem;
  background-color: #202020;
  
  ${media.sm`
    height: ${STYLE_HEADER_HEIGHT_SM_INT}rem;
  `};
`
const PageWrap = styled.div`
  margin: ${STYLE_PAGE_MARGIN};
  padding: ${UNIT_LG};
  max-width: 1140px;
  background-color: #353535;

  ${media.sm`
    margin: ${STYLE_PAGE_MARGIN_SM};
    padding: 32px;
  `};
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
