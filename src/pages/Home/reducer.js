import {
  SHAPE_ASYNC_STATUS_INITIAL,
  SHAPE_ASYNC_STATUS_REQUESTED,
  SHAPE_ASYNC_STATUS_SUCCEEDED,
  SHAPE_ASYNC_STATUS_FAILED,
} from '../../constants/shapeState'
import { randomiseArray } from '../../utils'

// get data
export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED'
export const getDataRequested = () => ({
  type: GET_DATA_REQUESTED,
})

export const GET_DATA_SUCCEEDED = 'GET_DATA_SUCCEEDED'
export const getDataSucceeded = ({ payload }) => ({
  type: GET_DATA_SUCCEEDED,
  payload,
})

export const GET_DATA_FAILED = 'GET_DATA_FAILED'
export const getDataFailed = (error) => ({
  type: GET_DATA_FAILED,
  error,
})

// select choice
export const SELECT_ANSWER = 'SELECT_ANSWER'
export const selectAnswer = (({ id, selectedAnswer, correctAnswer }) => ({
  type: SELECT_ANSWER,
  payload: {
    id,
    selectedAnswer,
    correctAnswer,
  },
}))

// complete quiz
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ'
export const completeQuiz = () => ({
  type: COMPLETE_QUIZ,
})

// set timer
export const SET_TIMER = 'SET_TIMER'
export const setTimer = ({ timeRemaining }) => ({
  type: SET_TIMER,
  payload: {
    timeRemaining,
  },
})

export const init = () => ({
  isQuizComplete: false,
  count: 0,
  questions: [],
  selectedAnswers: [],
  timeRemaining: 30,
  asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
})

const NUMBER_OF_QUESTIONS = 10


export default function reducer(state, action) {
  switch (action.type) {
    // get data
    case GET_DATA_REQUESTED: {
      return {
        ...state,
        asyncStatus: SHAPE_ASYNC_STATUS_REQUESTED,
      }
    }

    case GET_DATA_SUCCEEDED: {
      const { payload } = action
      const NUMBER_OF_CHOICES = 3

      const termsByRandom = [...payload]
      randomiseArray(termsByRandom)

      const answers = termsByRandom.map(({ title }) => title)
      const incorrectAnswers = answers.filter((item, index) => index >= NUMBER_OF_QUESTIONS)

      const termsForQuiz = termsByRandom
        .filter((item, index) => index < NUMBER_OF_QUESTIONS)
        .map((term, index) => {
          const incorrectAnswersForTerm = incorrectAnswers.slice(index * NUMBER_OF_CHOICES, (index * NUMBER_OF_CHOICES) + NUMBER_OF_CHOICES)
          return ({
            ...term,
            answers: [term.title, ...incorrectAnswersForTerm],
            isFinalQuestion: index === NUMBER_OF_QUESTIONS - 1
          })
        })
      return {
        ...state,
        questions: termsForQuiz,
        asyncStatus: SHAPE_ASYNC_STATUS_SUCCEEDED,
      }
    }

    case GET_DATA_FAILED: {
      return {
        ...state,
        asyncStatus: SHAPE_ASYNC_STATUS_FAILED(action.payload || 'could not get glossary'),
      }
    }

    // select choice
    case SELECT_ANSWER: {
      console.log(action.payload)
      return {
        ...state,
        selectedAnswers: [
          ...state.selectedAnswers,
          action.payload,
        ],
      }
    }

    // complete quiz
    case COMPLETE_QUIZ: {
      return {
        ...state,
        isQuizComplete: true,
      }
    }

    // set timer
    case SET_TIMER: {
      return {
        ...state,
        timeRemaining: action.payload.timeRemaining,
      }
    }

    default:
      throw new Error()
  }
}
