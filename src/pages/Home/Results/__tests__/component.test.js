import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Results from '../component'
import { SHAPE_ASYNC_STATUS_INITIAL, answerCorrect, answerIncorrect } from '../../../../constants'

describe('Results', () => {
  const props = {
    isQuizComplete: false,
    totalTime: 20,
    selectedAnswers: [],
    onResetQuiz() {},
    asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
  }
  test('matches snapshot', () => {
    const { container } = render(<Results {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders nothing by default', () => {
    const { queryByTestId } = render(<Results {...props} />)
    expect(queryByTestId('component-results')).toBeFalsy()
  })
  test('renders elements if isQuizComplete', () => {
    const { queryByTestId, queryByText } = render(<Results {...props} isQuizComplete />)
    expect(queryByTestId('component-results')).toBeTruthy()
    expect(queryByText('20 s')).toBeTruthy()
    expect(queryByText('0 / 0')).toBeTruthy()
  })
  test('renders correct score', () => {
    const updatedProps = {
      ...props,
      totalTime: 30,
      isQuizComplete: true,
      selectedAnswers: [answerCorrect, answerCorrect, answerIncorrect],
    }
    const { queryByTestId, queryByText } = render(<Results {...updatedProps} />)
    expect(queryByTestId('component-results')).toBeTruthy()
    expect(queryByText('30 s')).toBeTruthy()
    expect(queryByText('2 / 3')).toBeTruthy()
  })
})
