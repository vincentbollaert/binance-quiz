import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import reducer, {
  init,
  getDataRequested,
  getDataSucceeded,
  getDataFailed,
  selectAnswer,
  setTimer,
  completeQuiz,
} from './reducer'
import SpinnerLoader from '../../components/Spinner/component'
import Timer from './Timer/component'

const Terms = styled.div`
  max-width: 600px;
  margin: 0 auto;
`
const Term = styled.div`
  padding: 24px;
  margin-bottom: 12px;
  background-color: #e1e1e1;
`
const Description = styled.div`
`

const Answers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`
const Answer = styled.div`
  background: #444;
  padding: 4px 8px;
  color: #eee;
  margin: 0 4px;

  ${props => props.isQuizComplete && `
    ${props.isCorrectAnswer && 'background-color: green'};
    ${props.isSelectedAnswer && 'background-color: blue'};
    ${props.isCorrectAnswer && props.isSelectedAnswer && 'background-color: pink'};
  `}
`

const SelectedAnswers = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
  position: fixed;
  top: 40px;
  right: 40px;
  font-size: 12px;
`
const SelectedAnswer = styled.div`
  border-bottom: 1px solid red;
`

const Home = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  const {
    isQuizComplete,
    questions,
    selectedAnswers,
    timeRemaining,
    totalTime,
    asyncStatus
  } = state

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

  function onSetTimer(payload) {
    dispatch(setTimer({ timeRemaining: payload }))
  }

  return (
    <div>
      <SpinnerLoader asyncStatus={asyncStatus} />
      <Timer timeRemaining={timeRemaining} setTimer={onSetTimer} />
      <SelectedAnswers isShow={isQuizComplete}>
        {selectedAnswers.map(({ id, selectedAnswer, correctAnswer }) => (
          <SelectedAnswer>
            <div>Term id: {id}</div>
            <div>selected answer: {selectedAnswer}</div>
            <div>correct answer: {correctAnswer}</div>
            <div>correct? {selectedAnswer === correctAnswer ? 'YES :)' : 'NO :('}</div>
          </SelectedAnswer>
        ))}
        Total time: {totalTime} seconds
      </SelectedAnswers>
      <Terms>
        {questions.map(({ id, title, slug, excerpt, answers, isFinalQuestion }) => (
          <Term key={id}>
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
                    timeToChoose: 30 - timeRemaining,
                    isFinalQuestion,
                  })}
                >
                  {answer}
                </Answer>
              ))}
            </Answers>
          </Term>
        ))}
      </Terms>
    </div>
  )
}

export default Home
