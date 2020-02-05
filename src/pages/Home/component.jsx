import React, { useEffect, useReducer, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import reducer, {
  init,
  getDataRequested,
  getDataSucceeded,
  getDataFailed,
  selectAnswer,
  completeQuiz,
  showNextQuestion,
} from './reducer'
import SpinnerLoader from '../../components/Spinner/component'
import Timer from './Timer/component'

const QuizWrap = styled.div`
  max-width: 750px;
  margin: 0 auto;
  display: flex;
`
const Questions = styled.div``
const Question = styled.div`
  display: ${props => props.isQuizComplete || props.isActiveQuestion ? 'block' : 'none'};
  padding: 46px;
  background-color: #ffffff1c;
  padding-left: 0;
  padding-right: 0;
`
const Description = styled.div`
  font-size: 18px;
  margin-bottom: 70px;
  padding: 0 46px;
`

const Answers = styled.div`
  font-size: 15px;
`
const Answer = styled.div`
  background: #444;
  padding: 16px 24px 16px 49px;
  color: #eee;
  margin: 10px 0;
  display: flex;
  align-items: baseline;
  position: relative;

  ${props => props.isQuizComplete && `
    ${props.isCorrectAnswer && 'box-shadow: inset 0 0 0 2px #5cf2aa; color: #5cf2aa;'};
    ${props.isSelectedAnswer && 'box-shadow: inset 0 0 0 2px #f25c5c; color: #f25c5c'};
    ${props.isCorrectAnswer && props.isSelectedAnswer && 'box-shadow: inset 0 0 0 2px #5cf2aa; color: #5cf2aa;'};
  `}
`
const Icon = styled.div`
  position: absolute;
  left: 0px;
  height: 49px;
  width: 49px;
  line-height: 49px;
  text-align: center;
  top: 0;
  color: #5cf2aa;
`
const AdditionalInformation = styled.div`
  font-size: 12px;
  margin-left: auto;
`

const SelectedAnswers = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
  position: fixed;
  top: 40px;
  right: 40px;
  font-size: 12px;
`

const Next = styled.div`
  background: #444;
  width: 114px;
  height: 114px;
  flex-shrink: 0;
  text-align: center;
  line-height: 114px;
  text-transform: uppercase;
  font-size: 14px;
`

const Home = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  const {
    isQuizComplete,
    questions,
    activeQuestion,
    selectedAnswers,
    totalTime,
    asyncStatus
  } = state
  const childRef = useRef()

  useEffect(() => {
    dispatch(getDataRequested())
    axios.get('http://api.binance.vision/api/glossaries/')
      .then(({ data }) => dispatch(getDataSucceeded({ payload: data })))
      .catch(error => dispatch(getDataFailed({ payload: error })))
  }, [])

  function onSelectAnswer({ id, selectedAnswer, correctAnswer, timeToChoose, isFinalQuestion }) {
    dispatch(selectAnswer({ id, selectedAnswer, correctAnswer, timeToChoose }))
    if (isFinalQuestion) { dispatch(completeQuiz()) }
  }

  function onNextClick({ activeQuestionId }) {
    dispatch(showNextQuestion({ activeQuestionId }))
    onResetTimer()
  }

  function onResetTimer() {
    childRef.current.onResetTimer()
  }
  function onGetTimeRemaining() {
    return childRef.current.onGetTimeRemaining()
  }

  return (
    <div>
      <SpinnerLoader asyncStatus={asyncStatus} />
      <Timer ref={childRef} />
      <SelectedAnswers isShow={isQuizComplete}>
        Total time: {totalTime} seconds
      </SelectedAnswers>
      <QuizWrap>
        <Questions>
          {questions.map(({ id, title, slug, excerpt, answers, isFinalQuestion }) => (
            <Question isQuizComplete={isQuizComplete} isActiveQuestion={id === activeQuestion.id}>
              <Description>{excerpt}</Description>
              <Answers>
                {answers.map(answer => (
                  <Answer
                    key={answer}
                    isCorrectAnswer={title === answer}
                    isSelectedAnswer={(selectedAnswers.filter(selectedAnswer => selectedAnswer.id === id)[0] || {}).selectedAnswer === answer}
                    isQuizComplete={isQuizComplete}
                    onClick={() => onSelectAnswer({
                      id,
                      selectedAnswer: answer,
                      correctAnswer: title,
                      timeToChoose: onGetTimeRemaining(),
                      isFinalQuestion,
                    })}
                  >
                    <Icon>O</Icon>
                    {answer}
                    <AdditionalInformation>30% blah blah</AdditionalInformation>
                  </Answer>
                ))}
              </Answers>
            </Question>
          ))}
        </Questions>
        {!isQuizComplete && <Next onClick={() => onNextClick({ activeQuestionId: activeQuestion.id })}>Next</Next>}
      </QuizWrap>
    </div>
  )
}

export default Home
