import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import { media, UNIT_LG } from '../styles'
import reset from '../styles/reset'
import logoImage from '../assets/logo.png'
import Home from '../pages/Home/component'

export const CLASSNAME_APPLICATION = 'application'
const GlobalStyle = createGlobalStyle`
  ${reset};
`

const STYLE_HEADER_HEIGHT = '5rem'
const STYLE_HEADER_HEIGHT_SM = '6.4rem'

const AppContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template: "header" ${STYLE_HEADER_HEIGHT} "body" auto "footer" 380px;

  ${media.sm`
    grid-template: "header" ${STYLE_HEADER_HEIGHT_SM} "body" auto "footer" 380px;
  `}
`
const Header = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 ${UNIT_LG};
  background-color: #202020;
`
const Logo = styled.img`
  background: red;
`

const Footer = styled.div`
  grid-area: footer;
  background-color: #202020;
`
const PageWrap = styled.div`
  grid-area: body;
  max-width: 1140px;

  ${media.xsm`
    margin: ${UNIT_LG} auto;
    padding: ${UNIT_LG};
  `}
  ${media.sm`
    padding: 32px;
    margin: ${UNIT_LG};
    margin-right: auto;
  `};
  ${media.lg`
    margin: ${UNIT_LG} auto;
  `};
`

const Application = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo src={logoImage} />
        </Header>
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
