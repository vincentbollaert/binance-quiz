import React from 'react'
import styled from 'styled-components'
import { bool, arrayOf, shape, func } from 'prop-types'

import {
  media,
  UNIT_XXLG,
  UNIT_LG,
  SELECTIVE_YELLOW,
  MEDIUM_AQUAMARINE,
  SUNSET_ORANGE,
  FONT_SIZE_MD,
  FONT_SIZE_LG,
  UNIT_XLG,
  JET_LIGHTER,
} from '../../../styles'
import { SHAPE_QUIZ_QUESTION, SHAPE_QUESTION, SHAPE_SELECTED_ANSWER } from '../shapePropTypes'
import { CN_ANSWER } from '../shared'
import Radio from '../../../components/Radio/component'
import Tooltip from '../../../components/Tooltip/component'
import Accordion from '../../../components/Accordion/component'
import AdditionalInfo from '../AdditionalInfo/component'

const Wrap = styled.div`
  font-size: ${FONT_SIZE_MD};

  ${media.xsm`
    font-size: ${FONT_SIZE_LG};
  `};
`

const Answer = styled.div`
  padding: ${UNIT_LG};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid #5d5d5d66;

  &:last-child {
    border-bottom: none;
  };

  ${props => props.isQuestionFinished && `
    opacity: ${props.accentColor ? 1 : '0.4'};
    cursor: default;
    background-color: ${props.accentColor ? JET_LIGHTER : 'none'};
    border-bottom-color: ${!props.isQuizComplete && props.accentColor ? props.accentColor : '#5d5d5d66'};
  `};

  ${media.xsm`
    padding: ${UNIT_XLG};
    padding-left: ${UNIT_XXLG};
  `};
`

const TooltipStyled = styled(Tooltip)`
  ${media.xsm`
    display: none;
  `};
`
const AccordionStyled = styled(Accordion)`
  ${media.xsm`
    display: none;
  `};
`

const Answers = ({
  isQuizComplete,
  selectedAnswers,
  activeQuestion,
  allQuestions,
  onSelectAnswer,
  onGetTimeToChoose,
}) => {
  const { id, title, answers } = activeQuestion
  const { selectedAnswer, isTimeout } = (selectedAnswers.find(({ id: answerId }) => answerId === id) || {})
  const isCorrectSelected = selectedAnswer === title
  const isQuestionFinished = selectedAnswer !== undefined || isTimeout
  // const isQuizComplete = true

  return (
    <Wrap>
      {answers.map(answer => {
        const isSelectedAnswerOption = answer === selectedAnswer
        const questionMatchingAnswer = allQuestions.find(question => question.title === answer)
        const dummyRandomNumber = Math.round(Math.random() * 100)
        const isCorrectAnswer = answer === title
        const isIncorrectSelected = isSelectedAnswerOption && !isCorrectSelected
        const accentColor =
          (!isQuizComplete && isSelectedAnswerOption ? SELECTIVE_YELLOW : undefined) ||
          (isQuizComplete && isCorrectAnswer ? MEDIUM_AQUAMARINE : isIncorrectSelected ? SUNSET_ORANGE : undefined)

        return (
          <Answer
            key={answer}
            className={CN_ANSWER}
            isQuestionFinished={isQuestionFinished}
            isQuizComplete={isQuizComplete}
            accentColor={accentColor}
            onClick={() => !isQuestionFinished && onSelectAnswer({
              id,
              selectedAnswer: answer,
              correctAnswer: title,
              timeToChoose: onGetTimeToChoose(),
            })}
          >
            <Radio
              isQuestionFinished={isQuestionFinished}
              accentColor={accentColor}
              id={answer}
            />
            {answer}
            <AdditionalInfo
              isQuestionFinished={isQuestionFinished}
              isQuizComplete={isQuizComplete}
              isTimeout={isTimeout}
              isCorrect={isCorrectSelected}
              accentColor={accentColor}
              answer={answer}
              correctAnswer={title}
              questionMatchingAnswer={questionMatchingAnswer}
              dummyRandomNumber={dummyRandomNumber}
            />
            <TooltipStyled
              isShow={isQuizComplete && isSelectedAnswerOption && isCorrectSelected}
              label={dummyRandomNumber}
              tooltip={`${dummyRandomNumber}% of users got this right`}
            />
            <AccordionStyled
              isShow={isQuizComplete && isSelectedAnswerOption && !isCorrectSelected}
              content={`Definition: ${questionMatchingAnswer.excerpt}`}
            />
          </Answer>
        )
      })}
    </Wrap>
  )
}

Answers.propTypes = {
  isQuizComplete: bool.isRequired,
  selectedAnswers: arrayOf(shape(SHAPE_SELECTED_ANSWER)).isRequired,
  activeQuestion: shape(SHAPE_QUIZ_QUESTION).isRequired,
  allQuestions: arrayOf(shape(SHAPE_QUESTION)).isRequired,
  onSelectAnswer: func.isRequired,
  onGetTimeToChoose: func.isRequired,
}

export default Answers
