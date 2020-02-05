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

const Questions = styled.div`
  max-width: 600px;
  margin: 0 auto;
`
const Question = styled.div`
  display: ${props => props.isQuizComplete || props.isActiveQuestion ? 'block' : 'none'};
  padding: 24px;
  margin-bottom: 12px;
  background-color: #ffffff1c;
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

const Next = styled.div`
  background-color: red;
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
  // const { id, title, slug, excerpt, answers, isFinalQuestion } = activeQuestion
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
                  {answer}
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}
      </Questions>
      {!isQuizComplete && <Next onClick={() => onNextClick({ activeQuestionId: activeQuestion.id })}>Next</Next>}
    </div>
  )
}

export default Home
