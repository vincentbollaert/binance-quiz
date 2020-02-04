import {
  SHAPE_ASYNC_STATUS_INITIAL,
  SHAPE_ASYNC_STATUS_REQUESTED,
  SHAPE_ASYNC_STATUS_SUCCEEDED,
  SHAPE_ASYNC_STATUS_FAILED,
} from '../../constants/shapeState'

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
  data: [],
  asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
})

export default function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}

    case 'decrement':
      return {count: state.count - 1}

    case GET_DATA_REQUESTED: {
      return {
        ...state,
        asyncStatus: SHAPE_ASYNC_STATUS_REQUESTED,
      }
    }

    case GET_DATA_SUCCEEDED: {
      return {
        ...state,
        data: action.payload.data,
        asyncStatus: SHAPE_ASYNC_STATUS_SUCCEEDED,
      }
    }

    case GET_DATA_FAILED: {
      return {
        ...state,
        asyncStatus: SHAPE_ASYNC_STATUS_FAILED(action.payload || 'could not get data'),
      }
    }

    default:
      throw new Error()
  }
}
