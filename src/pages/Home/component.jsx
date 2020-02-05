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
import cancelSvg from '../../assets/svg/cancel.svg'
import tickSvg from '../../assets/svg/tick.svg'
import Svg from '../../components/Svg/component'
import Timer from './Timer/component'

const QuizWrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
  display: flex;
`
const Questions = styled.div`
`
const Question = styled.div`
  display: ${props => props.isQuizComplete || props.isActiveQuestion ? 'block' : 'none'};
  padding: 46px;
  padding-bottom: 18px;
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
  background: #525252;
  padding: 20px 24px 20px 49px;
  color: #eee;
  margin: 10px 0;
  display: flex;
  align-items: center;
  position: relative;

  ${props => props.isQuizComplete && `
    ${props.isCorrect && 'box-shadow: inset 0 0 0 2px #5cf2aa; color: #5cf2aa; fill: #5cf2aa'};
    ${props.isIncorrect && 'box-shadow: inset 0 0 0 2px #f25c5c; color: #f25c5c; fill: #f25c5c'};
  `}
  ${props => props.isTimeout && `
    opacity: 0.5;
    cursor: not-allowed;
  `};
`
const AnswerStatus = styled(Svg)`
  position: absolute;
  top: 0;
  left: 0px;
  line-height: 49px;
  text-align: center;
  width: 50px;
  height: 100%;
  fill: inherit;
  padding: 18px;
`
const AdditionalInfo = styled.div`
  font-size: 12px;
  margin-left: auto;
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.isTimeout ? '#b8b8b8' : 'inherit'};
`
const Link = styled.a`
  color: inherit;

  &:hover {
    text-decoration: underline;
  };
`

const SelectedAnswers = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
  position: fixed;
  top: 40px;
  right: 40px;
  font-size: 12px;
`

const Next = styled.div`
  margin-left: 1px;
  background: #444;
  width: 114px;
  height: 114px;
  flex-shrink: 0;
  text-align: center;
  line-height: 114px;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #3d3d3d;
  };
`
const ProgressItems = styled.div`
  padding: 8px 0;
  box-shadow: inset -5px 0 11px -10px #0000008c;
  background: #404040;
  color: #a1a1a1;
`
const Progress = styled.div`
  margin: 0px 1px 0px 0;
  padding: 8px 14px;
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
    asyncStatus
  } = state
  const childRef = useRef()

  useEffect(() => {
    dispatch(getDataRequested())
    axios.get('http://api.binance.vision/api/glossaries')
      .then(({ data }) => dispatch(getDataSucceeded({ payload: data })))
      .catch(error => dispatch(getDataFailed({ payload: error })))
  }, [])

  function onSelectAnswer({ id, selectedAnswer, correctAnswer, timeToChoose, isFinalQuestion, isTimeout }) {
    dispatch(selectAnswer({ id, selectedAnswer, correctAnswer, timeToChoose, isTimeout }))
    onResetTimer()
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
  function onTimeFinished() {
    console.log('whoops no more time')
    onSelectAnswer({
      id: activeQuestion.id,
      selectedAnswer: '',
      correctAnswer: activeQuestion.title,
      timeToChoose: 30,
      isTimeout: true,
    })
  }

  return (
    <div>
      <SpinnerLoader asyncStatus={asyncStatus} />
      <Timer ref={childRef} setTimeFinished={onTimeFinished} />
      <SelectedAnswers isShow={isQuizComplete}>
        Total time: {totalTime} seconds
      </SelectedAnswers>
      <QuizWrap>
        <ProgressItems>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <Progress>item</Progress>
          ))}
        </ProgressItems>
        <Questions>
          {questions.map(({ id, title, slug, excerpt, answers, isFinalQuestion }) => {
            const { selectedAnswer, isTimeout } = (selectedAnswers.filter(({ id: answerId }) => answerId === id)[0] || {})
            const isCorrect = selectedAnswer === title

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
                        isTimeout={isTimeout}
                        isCorrect={isCorrect && isSelectedAnswerOption}
                        isIncorrect={!isCorrect && isSelectedAnswerOption}
                        isQuizComplete
                        onClick={() => onSelectAnswer({
                          id,
                          selectedAnswer: answer,
                          correctAnswer: title,
                          timeToChoose: onGetTimeRemaining(),
                          isFinalQuestion,
                        })}
                      >
                        {isSelectedAnswerOption && <AnswerStatus svg={isCorrect ? tickSvg : cancelSvg} />}
                        {answer}
                        {isSelectedAnswerOption && (
                          <AdditionalInfo>
                            {!isCorrect && (
                              <Link
                                href={`https://www.binance.vision/glossary/${questionMatchingAnswer.slug}`}
                                target="_blank"
                              >
                                {questionMatchingAnswer.excerpt}
                              </Link>
                            )}
                            {isCorrect && `${dummyRandomNumber}% of users got this right`}
                          </AdditionalInfo>
                        )}
                        {isTimeout && <AdditionalInfo isTimeout>Took too long</AdditionalInfo>}
                      </Answer>
                    )
                  })}
                </Answers>
              </Question>
            )
          })}
        </Questions>
        {!isQuizComplete && <Next onClick={() => onNextClick({ activeQuestionId: activeQuestion.id })}>Next</Next>}
      </QuizWrap>
    </div>
  )
}

export default Home
