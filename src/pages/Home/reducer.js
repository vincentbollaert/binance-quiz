import {
  SHAPE_ASYNC_STATUS_INITIAL,
  SHAPE_ASYNC_STATUS_REQUESTED,
  SHAPE_ASYNC_STATUS_SUCCEEDED,
  SHAPE_ASYNC_STATUS_FAILED,
} from '../../constants/shapeState'
import { randomiseArray } from '../../utils'

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED'
export const getDataRequested = () => ({
  type: GET_DATA_REQUESTED,
})

export const GET_DATA_SUCCEEDED = 'GET_DATA_SUCCEEDED'
export const getDataSucceeded = (payload) => ({
  type: GET_DATA_SUCCEEDED,
  payload,
})

export const GET_DATA_FAILED = 'GET_DATA_FAILED'
export const getDataFailed = (error) => ({
  type: GET_DATA_FAILED,
  error,
})

export const init = () => ({
  count: 0,
  terms: [],
  asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
})


export default function reducer(state, action) {
  switch (action.type) {
    case GET_DATA_REQUESTED: {
      return {
        ...state,
        asyncStatus: SHAPE_ASYNC_STATUS_REQUESTED,
      }
    }

    case GET_DATA_SUCCEEDED: {
      const { payload } = action.payload
      const NUMBER_OF_QUESTIONS = 10
      const NUMBER_OF_CHOICES = 3

      const termsByRandom = [...payload]
      randomiseArray(termsByRandom)

      const choices = termsByRandom.map(({ title }) => title)
      const incorrectChoices = choices.filter((item, index) => index >= NUMBER_OF_QUESTIONS)

      const termsForQuiz = termsByRandom
        .filter((item, index) => index < NUMBER_OF_QUESTIONS)
        .map((term, index) => {
          const incorrectChoicesForTerm = incorrectChoices.slice(index * NUMBER_OF_CHOICES, (index * NUMBER_OF_CHOICES) + NUMBER_OF_CHOICES)
          return ({
            ...term,
            choices: [term.title, ...incorrectChoicesForTerm]
          })
        })
      return {
        ...state,
        terms: termsForQuiz,
        asyncStatus: SHAPE_ASYNC_STATUS_SUCCEEDED,
      }
    }

    case GET_DATA_FAILED: {
      return {
        ...state,
        asyncStatus: SHAPE_ASYNC_STATUS_FAILED(action.payload || 'could not get glossary'),
      }
    }

    default:
      throw new Error()
  }
}
