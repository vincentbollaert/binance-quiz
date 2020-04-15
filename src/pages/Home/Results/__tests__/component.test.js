import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { QuizContext } from '../../../../context/QuizContext'
import Results from '../component'
import { SHAPE_ASYNC_STATUS_INITIAL, answerCorrect, answerIncorrect } from '../../../../constants'

describe('Results', () => {
  const context = {
    isQuizComplete: false,
    totalTime: 20,
    selectedAnswers: [],
    asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
  }
  const props = {
    onResetQuiz() {},
  }
  const tree = (overrideContext) => (
    <QuizContext.Provider value={{ ...context, ...overrideContext }}>
      <Results {...props} />
    </QuizContext.Provider>
  )
  test('matches snapshot', () => {
    const { container } = render(tree())
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders nothing by default', () => {
    const { queryByTestId } = render(tree())
    expect(queryByTestId('component-results')).toBeFalsy()
  })
  test('renders elements if isQuizComplete', () => {
    const { queryByTestId, queryByText } = render(tree({ isQuizComplete: true }))
    expect(queryByTestId('component-results')).toBeTruthy()
    expect(queryByText('20 s')).toBeTruthy()
    expect(queryByText('0 / 0')).toBeTruthy()
  })
  test('renders correct score', () => {
    const updatedContext = {
      totalTime: 30,
      isQuizComplete: true,
      selectedAnswers: [answerCorrect, answerCorrect, answerIncorrect],
    }
    const { queryByTestId, queryByText } = render(tree(updatedContext))
    expect(queryByTestId('component-results')).toBeTruthy()
    expect(queryByText('30 s')).toBeTruthy()
    expect(queryByText('2 / 3')).toBeTruthy()
  })
})
