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
export const getDataFailed = ({ payload }) => ({
  type: GET_DATA_FAILED,
  payload,
})

// select choice
export const SELECT_ANSWER = 'SELECT_ANSWER'
export const selectAnswer = (({ id, selectedAnswer, correctAnswer, timeToChoose, isTimeout, isCorrect }) => ({
  type: SELECT_ANSWER,
  payload: {
    id,
    selectedAnswer,
    correctAnswer,
    timeToChoose,
    isTimeout,
    isCorrect,
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

const MOCK_QUESTION = {
  id: 0,
  answers: [],
}
export const init = () => ({
  isQuizComplete: false,
  questions: [MOCK_QUESTION],
  allQuestions: [],
  activeQuestion: MOCK_QUESTION,
  selectedAnswers: [],
  totalTime: 0,
  asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
})

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
      const NUMBER_OF_QUESTIONS = 10
      const NUMBER_OF_ANSWERS = 3

      const questionsByRandom = randomiseArray(payload)
      const incorrectAnswers = questionsByRandom
        .map(({ title }) => title)
        .filter((item, index) => index >= NUMBER_OF_QUESTIONS)

      const questionsForQuiz = questionsByRandom
        .filter((item, index) => index < NUMBER_OF_QUESTIONS)
        .map((question, index) => {
          const answers = [
            question.title,
            ...incorrectAnswers.slice(index * NUMBER_OF_ANSWERS, (index * NUMBER_OF_ANSWERS) + NUMBER_OF_ANSWERS)
          ]
          return ({
            ...question,
            answers: randomiseArray(answers),
            isFinalQuestion: index === NUMBER_OF_QUESTIONS - 1
          })
        })
      return {
        ...state,
        isQuizComplete: false,
        selectedAnswers: [],
        totalTime: 0,
        questions: questionsForQuiz,
        allQuestions: questionsByRandom,
        activeQuestion: questionsForQuiz[0],
        asyncStatus: SHAPE_ASYNC_STATUS_SUCCEEDED,
      }
    }

    case GET_DATA_FAILED: {
      const error = `The following error occured: ${action.payload ? action.payload : 'could not get glossary'}`
      return {
        ...state,
        asyncStatus: SHAPE_ASYNC_STATUS_FAILED(error),
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
        activeQuestion: {},
      }
    }

    // show next question
    case SHOW_NEXT_QUESTION: {
      const activeQuestionIndex = state.questions.findIndex(question => question.id === action.payload.activeQuestionId)
      return {
        ...state,
        activeQuestion: state.questions.find((question, index) => index === activeQuestionIndex + 1),
      }
    }

    default:
      throw new Error()
  }
}
