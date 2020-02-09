import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

import { media, UNIT_LG, RAISIN_BLACK, ASH_GRAY, LIGHT_GRAY } from '../styles'
import reset from '../styles/reset'
import logoImage from '../assets/logo.png'
import logoSvg from '../assets/svg/glossary-quiz-logo.svg'
import Svg from '../components/Svg/component'
import { STYLE_HEADER_HEIGHT, STYLE_HEADER_HEIGHT_SM } from './shared'
import Home from '../pages/Home/component'

const GlobalStyle = createGlobalStyle`
  ${reset};
`
const STYLE_FOOTER_HEIGHT = '20rem'

const AppContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template: "header" ${STYLE_HEADER_HEIGHT} "body" auto "footer" ${STYLE_FOOTER_HEIGHT};

  ${media.md`
    grid-template: "header" ${STYLE_HEADER_HEIGHT_SM} "body" auto "footer" ${STYLE_FOOTER_HEIGHT};
  `};
`
const Header = styled.div`
  grid-area: header;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${UNIT_LG};
  background-color: ${RAISIN_BLACK};
`
const Logo = styled.img``

const transition = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(359deg); }
`

const Link = styled.a`
  font-size: 14px;
  color: ${ASH_GRAY};

  &:hover {
    color: ${LIGHT_GRAY};
    animation: ${transition} 2s linear infinite;
  };
`
const Bg = styled(Svg)`
  position: fixed;
  width: 200rem;
  transform: rotate(45deg) translate(-600px, 583px);
  left: 100%;
  top: 0;

  * {
    fill: rgba(73, 73, 73, 0.05);
  };
`

const Footer = styled.div`
  grid-area: footer;
  background-color: ${RAISIN_BLACK};
`
const PageWrap = styled.div`
  position: relative;
  grid-area: body;
  margin: auto;
  width: 100%;
  max-width: 114rem;

  ${media.sm`
    padding: ${UNIT_LG};
  `};
  ${media.md`
    padding: 3.2rem;
  `};
  ${media.lg`
    width: auto;
  `};
`

const Application = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Bg svg={logoSvg} />
        <Header>
          <Logo src={logoImage} />
          <Link href="https://github.com/vincentbollaert/binance-quiz">github</Link>
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
