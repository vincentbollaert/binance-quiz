import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled, { createGlobalStyle } from 'styled-components'

import { media, UNIT_LG, RAISIN_BLACK } from '../styles'
import reset from '../styles/reset'
import logoImage from '../assets/logo.png'
import Home from '../pages/Home/component'

const history = createBrowserHistory()

const GlobalStyle = createGlobalStyle`
  ${reset};
`
const STYLE_HEADER_HEIGHT = '5rem'
const STYLE_HEADER_HEIGHT_SM = '6.4rem'
const STYLE_FOOTER_HEIGHT = '20rem'

const AppContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template: "header" ${STYLE_HEADER_HEIGHT} "body" auto "footer" ${STYLE_FOOTER_HEIGHT};

  ${media.sm`
    grid-template: "header" ${STYLE_HEADER_HEIGHT_SM} "body" auto "footer" ${STYLE_FOOTER_HEIGHT};
  `};
`
const Header = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 ${UNIT_LG};
  background-color: ${RAISIN_BLACK};
`
const Logo = styled.img`
  background: red;
`

const Footer = styled.div`
  grid-area: footer;
  background-color: ${RAISIN_BLACK};
`
const PageWrap = styled.div`
  grid-area: body;
  max-width: 114rem;

  ${media.xsm`
    margin: ${UNIT_LG} auto;
    padding: ${UNIT_LG};
  `}
  ${media.sm`
    padding: 3.2rem;
    margin: ${UNIT_LG};
    margin-right: auto;
  `};
  ${media.lg`
    margin: ${UNIT_LG} auto;
  `};
`

const Application = () => {
  return (
    <Router history={history}>
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
    </Router>
  )
}

export default Application
