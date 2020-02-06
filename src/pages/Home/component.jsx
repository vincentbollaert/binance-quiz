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
import Radio from '../../components/Radio/component'

const QuizWrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
  display: flex;
`
const Questions = styled.div`
  position: relative;
`
const Question = styled.div`
  display: ${props => props.isQuizComplete || props.isActiveQuestion ? 'block' : 'none'};
  padding: 46px 0 26px;
  padding-bottom: 18px;
  background-color: #353535;
`
const Description = styled.div`
  font-size: 18px;
  margin-bottom: 50px;
  padding: 0 46px;
`

const Answers = styled.div`
  font-size: 15px;
`
const Answer = styled.div`
  padding: 24px 24px 24px 46px;
  color: #eee;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.1s ease;
  border-bottom: 1px solid #5d5d5d66;

  &:last-child {
    border-bottom: none;
  };

  ${props => props.isQuestionFinished && `
    opacity: 0.7;
    cursor: not-allowed;
    ${(props.isCorrect || props.isIncorrect) && `
      opacity: 1;
      cursor: pointer;
      // box-shadow: inset 0 0 0 2px ${props.accentColor};
      color: ${props.accentColor};
    `};
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

const Next = styled.button`
  background-color: #444;
  width: 114px;
  height: 114px;
  flex-shrink: 0;
  text-align: center;
  line-height: 114px;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  pointer-events: none;

  ${props => props.isQuestionFinished && `
    pointer-events: all;
    background-color: #f0b90b;
    color: #705603;

    &:hover {
      background-color: #ffba0a;
    };
  `}
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
    axios.get(`https://api.allorigins.win/raw?url=http://api.binance.vision/api/glossaries`)
      .then(({ data }) => dispatch(getDataSucceeded({ payload: data })))
      .catch(error => dispatch(getDataFailed({ payload: error })))
  }, [])

  function onSelectAnswer({ id, selectedAnswer, correctAnswer, timeToChoose, isFinalQuestion, isTimeout, isCorrect }) {
    dispatch(selectAnswer({ id, selectedAnswer, correctAnswer, timeToChoose, isTimeout, isCorrect }))
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
    return childRef.current ? childRef.current.onGetTimeRemaining() : 15
  }
  function onTimeFinished() {
    onSelectAnswer({
      id: activeQuestion.id,
      selectedAnswer: '',
      correctAnswer: activeQuestion.title,
      isCorrect: false,
      timeToChoose: 15,
      isTimeout: true,
    })
  }

  return (
    <div>
      <SpinnerLoader asyncStatus={asyncStatus} />
      <SelectedAnswers isShow={isQuizComplete}>
        Total time: {totalTime} seconds
      </SelectedAnswers>
      <QuizWrap>
        <Questions>
          <Timer ref={childRef} setTimeFinished={onTimeFinished} />
          {questions.map(({ id, title, slug, excerpt, answers, isFinalQuestion }) => {
            const { selectedAnswer, isTimeout } = (selectedAnswers.filter(({ id: answerId }) => answerId === id)[0] || {})
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
                        isQuestionFinished={isQuestionFinished}
                        isCorrect={isCorrect && isSelectedAnswerOption}
                        isIncorrect={!isCorrect && isSelectedAnswerOption}
                        accentColor={isCorrect ? '#5cf2aa' : '#f25c5c'}
                        isQuizComplete
                        onClick={() => !isQuestionFinished && onSelectAnswer({
                          id,
                          selectedAnswer: answer,
                          correctAnswer: title,
                          isCorrect: answer === title,
                          timeToChoose: onGetTimeRemaining(),
                          isFinalQuestion,
                        })}
                      >
                        {isSelectedAnswerOption && <AnswerStatus svg={isCorrect ? tickSvg : cancelSvg} />}
                        <Radio
                          checked={true}
                          id={id}
                          name={id}
                          // onClick,
                        />
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
        {!isQuizComplete && (
          <Next
            isQuestionFinished={(selectedAnswers[selectedAnswers.length - 1] || {}).id === activeQuestion.id}
            onClick={() => onNextClick({ activeQuestionId: activeQuestion.id })}
          >
            Next
          </Next>
        )}
      </QuizWrap>
    </div>
  )
}

export default Home
