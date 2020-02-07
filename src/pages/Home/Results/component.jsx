import React from 'react'
import styled from 'styled-components'
import { bool, number, func, shape } from 'prop-types'
import { media, UNIT_XXLG, UNIT_LG, UNIT_XSM, FONT_SIZE_MD, FONT_SIZE_LG } from '../../../styles'
import { PROP_ASYNC_STATUS } from '../../../constants'
import { STYLE_RESULTS_WIDTH, STYLE_QUIZ_WIDTH_IS_COMPLETE } from '../shared'
import Button from '../../../components/Button/component'

const Wrap = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
  margin: 32px auto;
  padding: ${UNIT_XXLG};
  width: ${STYLE_RESULTS_WIDTH}rem;
  font-size: ${FONT_SIZE_MD};
  background: #202020;
  line-height: 1.4;

  ${media.xsm`
    margin-top: 0;
  `};

  ${media.sm`
    position: fixed;
    right: 0;
    margin: 0;
  `};

  ${media.lg`
    right: auto;
    left: 50%;
    margin-left: ${STYLE_QUIZ_WIDTH_IS_COMPLETE / 2}rem;
  `};
`
const Header = styled.div`
  margin-bottom: ${UNIT_LG};
  font-size: ${FONT_SIZE_LG};
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

const Results = ({ isQuizComplete, totalTime, onResetQuiz, asyncStatus }) => (
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
        <Button onClick={onResetQuiz} asyncStatus={asyncStatus}>Try again</Button>
      </Row>
    </Wrap>) : null
)

Results.propTypes = {
  isQuizComplete: bool.isRequired,
  totalTime: number.isRequired,
  onResetQuiz: func.isRequired,
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
}

export default Results
