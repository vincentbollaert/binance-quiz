import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { QuizContext } from '../../../../context/QuizContext'
import { selectedAnswer, questions, activeQuestion } from '../../../../constants'
import Answers from '../component'

describe('Answers', () => {
  const context = {
    isQuizComplete: false,
    selectedAnswers: [],
    allQuestions: questions,
  }
  const props = {
    activeQuestion,
    onSelectAnswer() {},
    onGetTimeToChoose() {},
  }
  const tree = (contextOverride) => (
    <QuizContext.Provider value={{ ...context, ...contextOverride}}>
      <Answers {...props} />
    </QuizContext.Provider>
  )
  test('matches snapshot', () => {
    const { container } = render(tree())
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders elements', () => {
    const { queryByTestId, queryAllByTestId, queryByText } = render(tree())
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
    const updatedContext = {
      ...context,
      isQuizComplete: true,
      selectedAnswers: [selectedAnswer],
    }
    const { queryAllByTestId } = render(tree(updatedContext))
    expect(queryAllByTestId('component-tooltip')).toHaveLength(1)
  })
})
