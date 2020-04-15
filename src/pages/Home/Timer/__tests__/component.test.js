import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { SHAPE_ASYNC_STATUS_INITIAL } from '../../../../constants'
import { QuizContext } from '../../../../context/QuizContext'
import Timer from '../component'

describe('Timer', () => {
  const context = {
    isQuizComplete: false,
    asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
  }
  const props = {
    setTimeFinished() {},
  }
  const tree = (contextOverride) => (
    <QuizContext.Provider value={{ ...context, ...contextOverride }}>
      <Timer {...props} />
    </QuizContext.Provider>
  )
  test('matches snapshot', () => {
    const { container } = render(tree())
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders by default', () => {
    const { queryByTestId } = render(tree())
    expect(queryByTestId('component-timer')).toBeTruthy()
  })
  test('renders nothing on isQuizComplete', () => {
    const { queryByTestId } = render(tree({ isQuizComplete: true }))
    expect(queryByTestId('component-timer')).toBeFalsy()
  })
})
