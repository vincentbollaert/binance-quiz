import React from 'react'
import styled from 'styled-components'
import { bool, arrayOf, shape, string, number, func } from 'prop-types'

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

  ${props => props.isSelectedAnswerQuizIncomplete && `border-bottom-color: ${SELECTIVE_YELLOW};`};
  ${props => props.isQuestionFinished && `
    opacity: 0.4;
    cursor: default;
    ${(props.isCorrect || props.isIncorrect) && `
      opacity: 1;
      color: ${props.isQuizComplete ? props.accentColor : 'inherit'};
      background-color: ${JET_LIGHTER};
    `};
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
  question: { id, title, answers },
  allQuestions,
  onSelectAnswer,
  onGetTimeRemaining,
}) => {
  const { selectedAnswer, isTimeout } = (selectedAnswers.find(({ id: answerId }) => answerId === id) || {})
  const isCorrect = selectedAnswer === title
  const isQuestionFinished = selectedAnswer || isTimeout

  return (
    <Wrap>
      {answers.map(answer => {
        const isSelectedAnswerOption = answer === selectedAnswer
        const questionMatchingAnswer = allQuestions.find(question => question.title === answer)
        const dummyRandomNumber = Math.round(Math.random() * 100)
        return (
          <Answer
            key={answer}
            className={CN_ANSWER}
            isQuestionFinished={isQuestionFinished}
            isCorrect={isCorrect && isSelectedAnswerOption}
            isIncorrect={!isCorrect && isSelectedAnswerOption}
            isSelectedAnswerQuizIncomplete={isSelectedAnswerOption && !isQuizComplete}
            accentColor={isCorrect ? MEDIUM_AQUAMARINE : SUNSET_ORANGE}
            isQuizComplete={isQuizComplete}
            onClick={() => !isQuestionFinished && onSelectAnswer({
              id,
              selectedAnswer: answer,
              correctAnswer: title,
              timeToChoose: onGetTimeRemaining(),
            })}
          >
            <Radio
              isQuizComplete={isQuizComplete}
              isDisabled={isQuestionFinished}
              checked={isSelectedAnswerOption}
              id={id}
              accentColor={isCorrect ? MEDIUM_AQUAMARINE : SUNSET_ORANGE}
            />
            {answer}
            <AdditionalInfo
              isTimeout={isTimeout}
              isCorrect={isCorrect}
              isQuizComplete={isQuizComplete}
              isSelectedAnswerOption={isSelectedAnswerOption}
              questionMatchingAnswer={questionMatchingAnswer}
              dummyRandomNumber={dummyRandomNumber}
            />
            <TooltipStyled
              isShow={isQuizComplete && isSelectedAnswerOption && isCorrect}
              label={dummyRandomNumber}
              tooltip={`${dummyRandomNumber}% of users got this right`}
            />
            <AccordionStyled
              isShow={isQuizComplete && isSelectedAnswerOption && !isCorrect}
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
  selectedAnswers: arrayOf(shape({})).isRequired,
  question: shape({
    id: number.isRequired,
    title: string.isRequired,
    excerpt: string.isRequired,
    answers: arrayOf(shape({})).isRequired,
  }).isRequired,
  allQuestions: arrayOf(shape({})).isRequired,
  onSelectAnswer: func.isRequired,
  onGetTimeRemaining: func.isRequired,
}

export default Answers
