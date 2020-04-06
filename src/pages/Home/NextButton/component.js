import React, { memo } from 'react'
import { bool, shape, arrayOf, func } from 'prop-types'
import styled from 'styled-components'

import { FONT_SIZE_LG, FONT_SIZE_XLG, SELECTIVE_YELLOW, CHARLESTON_GREEN_DARKER } from '../../../styles'
import { SHAPE_QUIZ_QUESTION, SHAPE_SELECTED_ANSWER } from '../shapePropTypes'

const Wrap = styled.button`
  display: ${props => props.isShow ? 'flex' : 'none'};
  margin-left: auto;
  justify-content: center;
  background-color: ${CHARLESTON_GREEN_DARKER};
  width: 11.4rem;
  height: 11.4rem;
  flex-shrink: 0;
  line-height: 1;
  text-transform: uppercase;
  font-size: ${FONT_SIZE_LG};
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  pointer-events: none;
  color: #7e7e7e;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${props => props.isQuestionFinished && `
    pointer-events: all;
    background-color: ${SELECTIVE_YELLOW};
    color: #705603;

    &:hover {
      background-color: #ffba0a;
    };
  `};
`
const InnerWrap = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZE_XLG};
`
const CurrentQuestion = styled.div`
  position: absolute;
  top: 0px;
  left: 4px;
`
const Divider = styled.div`
  width: 4.7rem;
  height: 1px;
  background: ${props => props.isQuestionFinished ? '#997e287a' : '#ffffff21'};
  position: absolute;
  margin-top: 0px;
  margin-left: 0px;
`
const NextQuestion = styled.div`
  position: absolute;
  right: 2px;
  bottom: 0px;
`

const NextButton = ({
  isQuizComplete,
  activeQuestion: { id, isFinalQuestion },
  selectedAnswers,
  onNextClick,
}) => {
  const isActiveQuestionFinished = selectedAnswers.length && selectedAnswers[selectedAnswers.length - 1].id === id
  return (
    <Wrap
      isShow={!isQuizComplete}
      isQuestionFinished={isActiveQuestionFinished}
      onClick={() => onNextClick({ activeQuestionId: id, isFinalQuestion })}
      data-testid="component-next-button"
    >
      {isFinalQuestion ? 'Finish' : (
        <InnerWrap>
          <CurrentQuestion data-testid="current-question">{selectedAnswers.length + 1}</CurrentQuestion>
          <Divider isQuestionFinished={isActiveQuestionFinished} />
          <NextQuestion>10</NextQuestion>
        </InnerWrap>
      )}
    </Wrap>
  )
}

NextButton.propTypes = {
  isQuizComplete: bool.isRequired,
  activeQuestion: shape(SHAPE_QUIZ_QUESTION),
  selectedAnswers: arrayOf(shape(SHAPE_SELECTED_ANSWER)).isRequired,
  onNextClick: func.isRequired,
}

NextButton.defaultProps = {
  activeQuestion: {},
}

export default memo(NextButton)
