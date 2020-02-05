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
export const selectAnswer = (({ id, selectedAnswer, correctAnswer, timeToChoose, isTimeout }) => ({
  type: SELECT_ANSWER,
  payload: {
    id,
    selectedAnswer,
    correctAnswer,
    timeToChoose,
    isTimeout,
  },
}))

// complete quiz
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ'
export const completeQuiz = () => ({
  type: COMPLETE_QUIZ,
})

// show next question
export const SHOW_NEXT_QUESTION = 'SHOW_NEXT_QUESTION'
export const showNextQuestion = ({ activeQuestionId }) => ({
  type: SHOW_NEXT_QUESTION,
  payload: {
    activeQuestionId,
  },
})

export const init = () => ({
  isQuizComplete: false,
  count: 0,
  questions: [],
  allQuestions: [],
  activeQuestion: {
    answers: [],
  },
  selectedAnswers: [],
  timeRemaining: 30,
  totalTime: 0,
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
        allQuestions: termsByRandom,
        activeQuestion: termsForQuiz[0],
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
      return {
        ...state,
        selectedAnswers: [
          ...state.selectedAnswers,
          action.payload,
        ],
        totalTime: state.totalTime + action.payload.timeToChoose,
      }
    }

    // complete quiz
    case COMPLETE_QUIZ: {
      return {
        ...state,
        isQuizComplete: true,
      }
    }

    // show next question
    case SHOW_NEXT_QUESTION: {
      const activeQuestionIndex = state.questions.findIndex(question => question.id === action.payload.activeQuestionId)
      console.log(activeQuestionIndex)
      return {
        ...state,
        activeQuestion: state.questions.find((question, index) => index === activeQuestionIndex + 1),
      }
    }

    default:
      throw new Error()
  }
}
