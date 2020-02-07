import React, { useEffect, useReducer, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import {
  media,
  UNIT_XXLG,
  UNIT_LG,
  SELECTIVE_YELLOW,
  MEDIUM_AQUAMARINE,
  SUNSET_ORANGE,
  TRANSITION,
  FONT_SIZE_MD,
  FONT_SIZE_LG,
  FONT_SIZE_XLG,
  UNIT_XLG,
  UNIT_SM,
  UNIT_XSM,
} from '../../styles'
import { API_BINANCE_PROXIED } from '../../api'
import reducer, {
  init, getDataRequested, getDataSucceeded, getDataFailed, selectAnswer, completeQuiz, showNextQuestion,
} from './reducer'
import { LineLoader } from '../../components/Loader'
import Radio from '../../components/Radio/component'
import Tooltip from '../../components/Tooltip/component'
import Accordion from '../../components/Accordion/component'
import { CN_ANSWER, TIMER_LENGTH, STYLE_QUIZ_WIDTH, STYLE_RESULTS_WIDTH, STYLE_QUIZ_WIDTH_IS_COMPLETE } from './shared'
import Timer from './Timer/component'
import NextButton from './NextButton/component'
import AdditionalInfo from './AdditionalInfo/component'
import Results from './Results/component'

const QuizWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: ${props => props.isQuizComplete ? 'column-reverse' : 'column'};
  transition: width ${TRANSITION};

  ${media.sm`
    flex-direction: row;
    margin-left: 0;
    width: ${props => props.isQuizComplete ? `calc(100% - ${STYLE_RESULTS_WIDTH}rem)` : '100%'};
  `};

  ${media.lg`
    transition: none;
    width: ${props => props.isQuizComplete ? `${STYLE_QUIZ_WIDTH_IS_COMPLETE}rem` : `${STYLE_QUIZ_WIDTH}rem`};
  `}
`
const Questions = styled.div`
  position: relative;
  width: 100%;
`
const Question = styled.div`
  display: ${props => props.isQuizComplete || props.isActiveQuestion ? 'block' : 'none'};
  ${props => props.isQuizComplete && `margin-bottom: ${UNIT_LG}`};
  padding-top: ${UNIT_XLG};
  padding-bottom: ${UNIT_SM};
  background-color: #353535;
  transition: padding ${TRANSITION};

  ${media.xsm`
    padding-top: ${UNIT_XXLG};
    padding-bottom: ${UNIT_LG};
  `};

  &:last-child {
    margin-bottom: 0;
  };
`
const Description = styled.div`
  margin-bottom: ${UNIT_LG};
  padding: 0 ${UNIT_LG};
  line-height: 1.4;
  font-size: ${FONT_SIZE_LG};

  ${media.xsm`
    margin-bottom: ${UNIT_XXLG};
    padding: 0 ${UNIT_XXLG};
    font-size: ${FONT_SIZE_XLG};
  `};
`

const Answers = styled.div`
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


const Home = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  const {
    isQuizComplete,
    questions,
    allQuestions,
    activeQuestion,
    selectedAnswers,
    totalTime,
    asyncStatus,
  } = state
  const childRef = useRef()

  useEffect(() => { getData() }, [])

  function getData() {
    dispatch(getDataRequested())
    axios.get(API_BINANCE_PROXIED)
      .then(({ data }) => {
        dispatch(getDataSucceeded({ payload: data }))
        onStopTimer({ isRestart: true })
      })
      .catch(error => dispatch(getDataFailed({ payload: error })))
  }

  function onSelectAnswer(params) {
    dispatch(selectAnswer({ ...params, isCorrect: params.selectedAnswer === params.correctAnswer }))
    onStopTimer()
  }

  function onNextClick({ activeQuestionId, isFinalQuestion }) {
    dispatch(showNextQuestion({ activeQuestionId }))
    if (isFinalQuestion) {
      dispatch(completeQuiz())
      onStopTimer({ isReset: true })
    } else {
      onStopTimer({ isRestart: true })
    }
  }

  function onStopTimer({ isReset, isRestart } = {}) {
    childRef.current.onStopTimer({ isReset, isRestart })
  }
  function onGetTimeRemaining() {
    return childRef.current ? childRef.current.onGetTimeRemaining() : TIMER_LENGTH
  }
  function onTimeFinished() {
    onSelectAnswer({
      id: activeQuestion.id,
      selectedAnswer: '',
      correctAnswer: activeQuestion.title,
      timeToChoose: TIMER_LENGTH,
      isTimeout: true,
    })
  }
  const isActiveQuestionFinished = (selectedAnswers[selectedAnswers.length - 1] || {}).id === activeQuestion.id
  const isLastQuestion = selectedAnswers.length && selectedAnswers.length === questions.length
  // const isQuizComplete = true

  return (
    <div>
      <LineLoader asyncStatus={asyncStatus} />
      <QuizWrap isQuizComplete={isQuizComplete}>
        <Questions>
          <Timer isQuizComplete={isQuizComplete} ref={childRef} setTimeFinished={onTimeFinished} />
          {questions.map(({ id, title, excerpt, answers }) => {
            const { selectedAnswer, isTimeout } = (selectedAnswers.find(({ id: answerId }) => answerId === id) || {})
            const isCorrect = selectedAnswer === title
            const isQuestionFinished = selectedAnswer || isTimeout

            return (
              <Question isQuizComplete={isQuizComplete} isActiveQuestion={id === activeQuestion.id}>
                <Description>{excerpt}</Description>
                <Answers>
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
                </Answers>
              </Question>
            )
          })}
        </Questions>
        <NextButton
          isQuizComplete={isQuizComplete}
          isActiveQuestionFinished={isActiveQuestionFinished}
          isLastQuestion={isLastQuestion}
          activeQuestion={activeQuestion}
          selectedAnswers={selectedAnswers}
          onNextClick={() => onNextClick({
            activeQuestionId: activeQuestion.id,
            isFinalQuestion: activeQuestion.isFinalQuestion,
          })}
        />
        <Results
          isQuizComplete={isQuizComplete}
          totalTime={totalTime}
          onResetQuiz={getData}
          asyncStatus={asyncStatus}
        />
      </QuizWrap>
    </div>
  )
}

export default Home
