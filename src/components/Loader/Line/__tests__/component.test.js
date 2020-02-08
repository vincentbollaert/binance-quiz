import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import LineLoader from '../component'
import { SHAPE_ASYNC_STATUS_INITIAL, SHAPE_ASYNC_STATUS_REQUESTED } from '../../../../constants'

describe('LineLoader', () => {
  const props = {
    asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
  }
  test('matches snapshot', () => {
    const { container } = render(<LineLoader {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders nothing by default', () => {
    const { queryByTestId } = render(<LineLoader {...props} />)
    expect(queryByTestId('component-svg')).toBeFalsy()
  })
  test('renders loader on requested', () => {
    const { queryByTestId } = render(<LineLoader asyncStatus={SHAPE_ASYNC_STATUS_REQUESTED} />)
    expect(queryByTestId('component-line-loader')).toBeTruthy()
  })
})
