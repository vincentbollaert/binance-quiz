import React, { useEffect, useReducer, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import {
  media,
  UNIT_XXLG,
  UNIT_LG,
  TRANSITION,
  FONT_SIZE_LG,
  FONT_SIZE_XLG,
  UNIT_XLG,
  UNIT_SM,
  JET,
} from '../../styles'
import { API_BINANCE_PROXIED } from '../../api'
import reducer, {
  init, getDataRequested, getDataSucceeded, getDataFailed, selectAnswer, completeQuiz, showNextQuestion,
} from './reducer'
import Error from '../../components/Error/component'
import { LineLoader } from '../../components/Loader'
import { TIMER_LENGTH, STYLE_QUIZ_WIDTH, STYLE_RESULTS_WIDTH, STYLE_QUIZ_WIDTH_IS_COMPLETE } from './shared'
import Timer from './Timer/component'
import Answers from './Answers/component'
import NextButton from './NextButton/component'
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
  box-shadow: 2px 3px 13px -13px #00000066;
`
const Question = styled.div`
  display: ${props => props.isQuizComplete || props.isActiveQuestion ? 'block' : 'none'};
  ${props => props.isQuizComplete && `margin-bottom: ${UNIT_LG}`};
  padding-top: ${UNIT_XLG};
  padding-bottom: ${UNIT_SM};
  min-height: 30rem;
  background-color: ${JET};
  transition: padding ${TRANSITION};

  ${media.xsm`
    padding-top: ${UNIT_XXLG};
    padding-bottom: ${UNIT_LG};
    min-height: 45rem;
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

  async function getData() {
    dispatch(getDataRequested())
    const { data } = await axios.get(API_BINANCE_PROXIED)

    if (data.length !== undefined) {
      dispatch(getDataSucceeded({ payload: data }))
      onSetTimer({ isRestart: true })
    } else {
      dispatch(getDataFailed({ payload: data.status.error.code }))
    }
  }

  function onSelectAnswer(params) {
    dispatch(selectAnswer({ ...params, isCorrect: params.selectedAnswer === params.correctAnswer }))
    onSetTimer()
  }

  function onNextClick({ activeQuestionId, isFinalQuestion }) {
    dispatch(showNextQuestion({ activeQuestionId }))
    if (isFinalQuestion) {
      dispatch(completeQuiz())
      onSetTimer({ isReset: true })
    } else {
      onSetTimer({ isRestart: true })
    }
  }

  function onSetTimer({ isReset, isRestart } = {}) {
    childRef.current.onSetTimer({ isReset, isRestart })
  }
  function onGetTimeToChoose() {
    return childRef.current ? childRef.current.onGetTimeToChoose() : TIMER_LENGTH
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

  return (
    <div>
      <LineLoader asyncStatus={asyncStatus} />
      <Error asyncStatus={asyncStatus} />
      <QuizWrap isQuizComplete={isQuizComplete}>
        <Questions>
          <Timer
            isQuizComplete={isQuizComplete}
            ref={childRef}
            setTimeFinished={onTimeFinished}
            asyncStatus={asyncStatus}
          />
          {questions.map((question) => {
            const { id, excerpt } = question

            return (
              <Question key={id} isQuizComplete={isQuizComplete} isActiveQuestion={id === activeQuestion.id}>
                <Description>{excerpt}</Description>
                <Answers
                  isQuizComplete={isQuizComplete}
                  selectedAnswers={selectedAnswers}
                  activeQuestion={question}
                  allQuestions={allQuestions}
                  onSelectAnswer={onSelectAnswer}
                  onGetTimeToChoose={onGetTimeToChoose}
                />
              </Question>
            )
          })}
        </Questions>
        <NextButton
          isQuizComplete={isQuizComplete}
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
          selectedAnswers={selectedAnswers}
          onResetQuiz={getData}
          asyncStatus={asyncStatus}
        />
      </QuizWrap>
    </div>
  )
}

export default Home