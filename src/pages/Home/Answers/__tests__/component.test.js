import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { selectedAnswer, questions, activeQuestion } from '../../../../constants'
import Answers from '../component'

describe('Answers', () => {
  const props = {
    isQuizComplete: false,
    selectedAnswers: [],
    activeQuestion,
    allQuestions: questions,
    onSelectAnswer() {},
    onGetTimeToChoose() {},
  }
  test('matches snapshot', () => {
    const { container } = render(<Answers {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders elements', () => {
    const { queryByTestId, queryAllByTestId, queryByText } = render(<Answers {...props} />)
    expect(queryAllByTestId('component-answer')).toHaveLength(4)
    expect(queryAllByTestId('component-radio')).toHaveLength(4)
    expect(queryAllByTestId('component-additional-info')).toHaveLength(4)
    expect(queryByTestId('component-tooltip')).toBeFalsy()
    expect(queryByText(props.activeQuestion.answers[0])).toBeTruthy()
    expect(queryByText(props.activeQuestion.answers[1])).toBeTruthy()
    expect(queryByText(props.activeQuestion.answers[2])).toBeTruthy()
    expect(queryByText(props.activeQuestion.answers[3])).toBeTruthy()
  })
  test('renders tooltips conditionally', () => {
    const updatedProps = {
      ...props,
      isQuizComplete: true,
      selectedAnswers: [selectedAnswer],
    }
    const { queryAllByTestId } = render(<Answers {...updatedProps} />)
    expect(queryAllByTestId('component-tooltip')).toHaveLength(1)
  })
})
