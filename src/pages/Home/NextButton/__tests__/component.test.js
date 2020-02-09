import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import NextButton from '../component'

describe('NextButton', () => {
  const answer = {
    id: 1,
    selectedAnswer: 'answer',
    correctAnswer: 'answer',
    timeToChoose: 10,
    isCorrect: true,
  }
  const props = {
    isQuizComplete: false,
    activeQuestion: { id: 1, isFinalQuestion: false },
    selectedAnswers: [],
    onNextClick() {},
  }
  test('matches snapshot', () => {
    const { container } = render(<NextButton {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders elements', () => {
    const { queryByTestId, queryByText } = render(<NextButton {...props} isShow />)
    expect(queryByTestId('component-next-button')).toBeTruthy()
    expect(queryByText('Finish')).toBeFalsy()
    expect(queryByTestId('current-question')).toHaveTextContent('1')
  })
  test('renders correct activeQuestion number', () => {
    const { queryByTestId, rerender } = render(<NextButton {...props} selectedAnswers={[answer]} />)
    expect(queryByTestId('current-question')).toHaveTextContent('2')

    rerender(<NextButton {...props} selectedAnswers={[answer, answer]} />)
    expect(queryByTestId('current-question')).toHaveTextContent('3')
  })
  test('renders finish  if on last question', () => {
    const { queryByText, queryByTestId } = render(<NextButton {...props} activeQuestion={{ id: 1, isFinalQuestion: true }} />)

    expect(queryByTestId('current-question')).toBeFalsy()
    expect(queryByText('Finish')).toBeTruthy()
  })
})
