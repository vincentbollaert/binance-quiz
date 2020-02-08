import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Error from '../component'
import { SHAPE_ASYNC_STATUS_INITIAL, SHAPE_ASYNC_STATUS_REQUESTED, SHAPE_ASYNC_STATUS_FAILED } from '../../../constants'

describe('Error', () => {
  test('matches snapshot', () => {
    const { container } = render(<Error asyncStatus={SHAPE_ASYNC_STATUS_INITIAL} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders nothing by default', () => {
    const asyncStatus = { ...SHAPE_ASYNC_STATUS_INITIAL, errorMessage: 'error message' }
    const { queryByText, queryByTestId } = render(<Error asyncStatus={asyncStatus} />)
    expect(queryByText('error message')).toBeFalsy()
    expect(queryByTestId('component-svg')).toBeFalsy()
  })
  test('renders svg and error message if isError', () => {
    const { queryByText, queryByTestId } = render(<Error asyncStatus={SHAPE_ASYNC_STATUS_FAILED('error message')} />)
    expect(queryByText('error message')).toBeTruthy()
    expect(queryByTestId('component-svg')).toBeTruthy()
  })
})
