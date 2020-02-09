import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { SHAPE_ASYNC_STATUS_INITIAL } from '../../../../constants'
import Timer from '../component'

describe('Timer', () => {
  const props = {
    isQuizComplete: false,
    setTimeFinished() {},
    asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
  }
  test('matches snapshot', () => {
    const { container } = render(<Timer {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders by default', () => {
    const { queryByTestId } = render(<Timer {...props} />)
    expect(queryByTestId('component-timer')).toBeTruthy()
  })
  test('renders nothing on isQuizComplete', () => {
    const { queryByTestId } = render(<Timer {...props} isQuizComplete />)
    expect(queryByTestId('component-timer')).toBeFalsy()
  })
})
