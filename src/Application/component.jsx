import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import { media, UNIT_LG, RAISIN_BLACK } from '../styles'
import reset from '../styles/reset'
import logoImage from '../assets/logo.png'
import Home from '../pages/Home/component'

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
  margin-top: ${UNIT_LG};
  max-width: 114rem;

  ${media.xsm`
    margin: ${UNIT_LG};
    padding: ${UNIT_LG};
  `};
  ${media.sm`
    padding: 3.2rem;
    margin: ${UNIT_LG};
  `};
  ${media.lg`
    margin: 0 auto;
  `};
`

const Application = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo src={logoImage} />
        </Header>
        <PageWrap>
          <Route path="/" component={Home} />
        </PageWrap>
        <Footer />
      </AppContainer>
    </Router>
  )
}

export default Application
