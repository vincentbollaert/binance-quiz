import { bool, string } from 'prop-types'

export const PROP_ASYNC_STATUS = {
  isInitial: bool.isRequired,
  isBusy: bool.isRequired,
  isError: bool.isRequired,
  isSuccessful: bool.isRequired,
  errorMessage: string,
}

export const placeholder = ''
