export const IS_INITIAL = 'isInitial'
export const IS_BUSY = 'isBusy'
export const IS_ERROR = 'isError'
export const IS_SUCCESSFUL = 'isSuccessful'
export const ERROR_MESSAGE = 'errorMessage'

export const SHAPE_ASYNC_STATUS_INITIAL = {
  [IS_INITIAL]: true,
  [IS_BUSY]: false,
  [IS_ERROR]: false,
  [IS_SUCCESSFUL]: false,
  [ERROR_MESSAGE]: undefined,
}

export const SHAPE_ASYNC_STATUS_REQUESTED = {
  [IS_INITIAL]: false,
  [IS_BUSY]: true,
  [IS_ERROR]: false,
  [IS_SUCCESSFUL]: false,
  [ERROR_MESSAGE]: undefined,
}

export const SHAPE_ASYNC_STATUS_SUCCEEDED = {
  [IS_INITIAL]: false,
  [IS_BUSY]: false,
  [IS_ERROR]: false,
  [IS_SUCCESSFUL]: true,
  [ERROR_MESSAGE]: undefined,
}

export const SHAPE_ASYNC_STATUS_FAILED = (error) => ({
  [IS_INITIAL]: false,
  [IS_BUSY]: false,
  [IS_ERROR]: true,
  [IS_SUCCESSFUL]: false,
  [ERROR_MESSAGE]: error,
})
