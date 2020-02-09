import React from 'react'
import styled from 'styled-components'
import { bool, number, func, shape, arrayOf } from 'prop-types'

import { media, UNIT_XXLG, UNIT_LG, UNIT_XSM, FONT_SIZE_LG, FONT_SIZE_MD, RAISIN_BLACK } from '../../../styles'
import { SHAPE_SELECTED_ANSWER } from '../shapePropTypes'
import { PROP_ASYNC_STATUS } from '../../../constants'
import { STYLE_RESULTS_WIDTH, STYLE_QUIZ_WIDTH_IS_COMPLETE } from '../shared'
import Button from '../../../components/Button/component'

const Wrap = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
  margin: 3.2rem auto;
  padding: ${UNIT_XXLG};
  width: ${STYLE_RESULTS_WIDTH}rem;
  font-size: ${FONT_SIZE_MD};
  background: ${RAISIN_BLACK};
  line-height: 1.4;

  ${media.sm`
    margin-top: 0;
  `};

  ${media.md`
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

const Results = ({ isQuizComplete, totalTime, selectedAnswers, onResetQuiz, asyncStatus }) => {
  const totalAnswers = selectedAnswers.length
  const totalCorrectAnswers = selectedAnswers.filter(answer => answer.isCorrect).length

  return (
    isQuizComplete ? (
      <Wrap isShow={isQuizComplete} data-testid="component-results">
        <Header>Quiz complete</Header>
        <Row>
          <Term>Total time</Term>
          <Description>{totalTime} s</Description>
        </Row>
        <Row>
          <Term>Score</Term>
          <Description>{totalCorrectAnswers} / {totalAnswers}</Description>
        </Row>
        <Row>
          <Button onClick={onResetQuiz} asyncStatus={asyncStatus}>Try again</Button>
        </Row>
      </Wrap>) : null
  )
}

Results.propTypes = {
  isQuizComplete: bool.isRequired,
  totalTime: number.isRequired,
  selectedAnswers: arrayOf(shape(SHAPE_SELECTED_ANSWER)).isRequired,
  onResetQuiz: func.isRequired,
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
}

export default Results
