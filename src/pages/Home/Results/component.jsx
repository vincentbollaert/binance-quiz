import React from 'react'
import styled from 'styled-components'

import { UNIT_XSM_INT, UNIT_LG, UNIT_XSM } from '../../../styles'
import { STYLE_RESULTS_WIDTH } from '../component'
import Button from '../../../components/Button/component'

const Wrap = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
  position: fixed;
  width: 214px;
  font-size: 12px;
  background: #202020;
  padding: 46px;
  left: 50%;
  margin-left: ${33 + UNIT_XSM_INT}rem;
  line-height: 1.4;
`
const Header = styled.div`
  margin-bottom: ${UNIT_LG};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${UNIT_XSM};

  &:last-child {
    margin-bottom: 0;
  };
`
const Term = styled.div`
  font-weight: bold;
  color: #6e6e6e;
`
const Description = styled.div`
  color: #acacad;
`

const Results = ({ isQuizComplete, totalTime }) => (
  isQuizComplete ? (
    <Wrap isShow={isQuizComplete}>
      <Header>Quiz complete</Header>
      <Row>
        <Term>Total time</Term>
        <Description>{totalTime} s</Description>
      </Row>
      <Row>
        <Term>Score</Term>
        <Description>8 / 10</Description>
      </Row>
      <Row>
        <Button>Try again</Button>
      </Row>
    </Wrap>) : null
)

export default Results
