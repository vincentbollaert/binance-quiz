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

const AppContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template: "header" 64px "body" auto "footer" 380px;
`
const Header = styled.div`
  height: ${STYLE_HEADER_HEIGHT_INT}rem;
  background-color: #202020;
  
  ${media.sm`
    height: ${STYLE_HEADER_HEIGHT_SM_INT}rem;
  `};
`

const Footer = styled.div`
  grid-area: footer;
  background-color: #202020;
`
const PageWrap = styled.div`
  grid-area: body;
  margin: ${UNIT_LG_INT}rem auto;
  padding: ${UNIT_LG};
  max-width: 1140px;
  background-color: #35353585;

  ${media.sm`
    padding: 32px;
  `};
`

const Application = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <PageWrap>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </PageWrap>
        <Footer />
      </AppContainer>
    </>
  )
}

export default Application
