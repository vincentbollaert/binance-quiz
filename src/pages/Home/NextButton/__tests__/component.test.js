import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { QuizContext } from '../../../../context/QuizContext'
import { answerCorrect } from '../../../../constants'
import NextButton from '../component'

describe('NextButton', () => {
  const context = {
    isQuizComplete: false,
    activeQuestion: { id: 1, isFinalQuestion: false },
    selectedAnswers: [],
  }
  const props = {
    onNextClick() {},
  }
  const tree = (contextOverride) => (
    <QuizContext.Provider value={{ ...context, ...contextOverride }}>
      <NextButton {...props} />
    </QuizContext.Provider>
  )
  test('matches snapshot', () => {
    const { container } = render(tree())
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders elements', () => {
    const { queryByTestId, queryByText } = render(tree())
    expect(queryByTestId('component-next-button')).toBeTruthy()
    expect(queryByText('Finish')).toBeFalsy()
    expect(queryByTestId('current-question')).toHaveTextContent('1')
  })
  test('renders correct activeQuestion number', () => {
    const { queryByTestId, rerender } = render(tree({ selectedAnswers: [answerCorrect] }))
    expect(queryByTestId('current-question')).toHaveTextContent('2')

    rerender(tree({ selectedAnswers: [answerCorrect, answerCorrect] }))
    expect(queryByTestId('current-question')).toHaveTextContent('3')
  })
  test('renders finish  if on last question', () => {
    const { queryByText, queryByTestId } = render(tree({ activeQuestion: { id: 1, isFinalQuestion: true } }))

    expect(queryByTestId('current-question')).toBeFalsy()
    expect(queryByText('Finish')).toBeTruthy()
  })
})
