import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import { func, shape } from 'prop-types'

import {
  media,
  UNIT_XXLG,
  UNIT_LG,
  LIGHT_GRAY,
  ASH_GRAY,
  SELECTIVE_YELLOW,
  MEDIUM_AQUAMARINE,
  SUNSET_ORANGE,
  FONT_SIZE_MD,
  FONT_SIZE_LG,
  UNIT_XLG,
  JET_LIGHTER,
  TRANSITION,
  SONIC_SILVER,
} from '../../../styles'
import {
  CN_ANSWER,
  CN_ADDITIONAL_INFO,
  STYLE_ADDITIONAL_INFO_BOX_SHADOW_HOVER,
  STYLE_ADDITIONAL_INFO_BOX_SHADOW,
} from '../shared'
import Radio from '../../../components/Radio/component'
import Tooltip from '../../../components/Tooltip/component'
import Accordion from '../../../components/Accordion/component'
import AdditionalInfo from '../AdditionalInfo/component'
import { QuizContext } from '../../../context/QuizContext'
import { SHAPE_QUIZ_QUESTION } from '../shapePropTypes'

const STYLE_BOX_SHADOW_COLOR = '#414141'
const STYLE_BOX_SHADOW_TOP = `inset 0 1px 0 0 ${STYLE_BOX_SHADOW_COLOR}`
const STYLE_BOX_SHADOW_BOTTOM = `inset 0 -1px 0 0 ${STYLE_BOX_SHADOW_COLOR}`
const STYLE_BOX_SHADOW = `${STYLE_BOX_SHADOW_TOP}, ${STYLE_BOX_SHADOW_BOTTOM}`

const Wrap = styled.div`
  font-size: ${FONT_SIZE_MD};

  ${media.sm} {
    font-size: ${FONT_SIZE_LG};
  };
`

const Answer = styled.div`
  padding: ${UNIT_LG};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  color: ${ASH_GRAY};
  cursor: pointer;
  transition: padding-top ${TRANSITION}, padding-bottom ${TRANSITION}, color ${TRANSITION};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    ${props => !props.isQuestionFinished && `
      background-color: ${JET_LIGHTER};
      box-shadow: ${STYLE_BOX_SHADOW};
      color: ${LIGHT_GRAY};
    `};
  };

  ${props => props.isQuestionFinished && `
    cursor: default;
    color: ${props.accentColor || SONIC_SILVER};

    &:hover {
      .${CN_ADDITIONAL_INFO} {
        box-shadow: ${props.isSelectedAnswerOption ? STYLE_ADDITIONAL_INFO_BOX_SHADOW_HOVER : STYLE_ADDITIONAL_INFO_BOX_SHADOW};
      };
    };

    ${props.isSelectedAnswerOption && `
      background-color:  ${JET_LIGHTER};

      .${CN_ADDITIONAL_INFO} {
        box-shadow: ${STYLE_ADDITIONAL_INFO_BOX_SHADOW_HOVER};
      };
    `};
    ${props.isQuizComplete && props.isSelectedAnswerOption && `box-shadow: ${STYLE_BOX_SHADOW}`};
    ${!props.isQuizComplete && props.isSelectedAnswerOption && `
      box-shadow: ${STYLE_BOX_SHADOW_TOP}, inset 0 -1px 0 0 ${props.accentColor}
    `};
  `};

  ${media.sm} {
    padding: ${UNIT_XLG};
    padding-left: ${UNIT_XXLG};
  };
`

const TooltipStyled = styled(Tooltip)`
  ${media.sm} {
    display: none;
  };
`
const AccordionStyled = styled(Accordion)`
  ${media.sm} {
    display: none;
  };
`

const Answers = ({ activeQuestion, onSelectAnswer, onGetTimeToChoose }) => {
  const { isQuizComplete, selectedAnswers, allQuestions } = useContext(QuizContext)
  const { id, title, answers } = activeQuestion
  const { selectedAnswer, isTimeout } = (selectedAnswers.find(({ id: answerId }) => answerId === id) || {})
  const isCorrectSelected = selectedAnswer === title
  const isQuestionFinished = selectedAnswer !== undefined || isTimeout
  
  return (
    <Wrap data-testid="component-answers">
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
            isSelectedAnswerOption={isSelectedAnswerOption}
            accentColor={accentColor}
            data-testid="component-answer"
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
              isShow={isQuizComplete && isCorrectAnswer && !isTimeout}
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
  activeQuestion: shape(SHAPE_QUIZ_QUESTION).isRequired,
  onSelectAnswer: func.isRequired,
  onGetTimeToChoose: func.isRequired,
}

export default memo(Answers)
