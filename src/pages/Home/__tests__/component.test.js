import '@testing-library/jest-dom'
import React from 'react'
import { render, act } from '@testing-library/react'
import axiosMock from 'axios'
import '@testing-library/jest-dom/extend-expect'
import { QuizContext, QuizContextDispatch } from '../../../context/QuizContext'

import { questions, SHAPE_ASYNC_STATUS_INITIAL, activeQuestion } from '../../../constants'
import Home from '../component'

describe('home', () => {
  test('loads data', async () => {
    axiosMock.get.mockImplementationOnce(() => (
      Promise.resolve({
        data: questions
      })
    ))

    let component
    function dispatch() {}

    await act(async () => {
      component = await render(
        <QuizContext.Provider value={{
          isQuizComplete: false,
          questions: [activeQuestion],
          activeQuestion: activeQuestion,
          asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
          selectedAnswers: [],
          answers: [],
          allQuestions: questions,
        }}>
          <QuizContextDispatch.Provider value={dispatch}>
            <Home />
          </QuizContextDispatch.Provider>
        </QuizContext.Provider>
      )
    })
    const loadingNode = await component.queryByTestId('component-line-loader')

    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(loadingNode).toBeFalsy()
    expect(component.queryByTestId('component-error')).toBeFalsy()
    expect(component.queryByTestId('component-next-button')).toBeTruthy()
    expect(component.queryByTestId('component-results')).toBeFalsy()
    expect(component.queryByTestId('component-timer')).toBeTruthy()

    expect(component.queryAllByTestId('component-question')).toHaveLength(1)
    expect(component.queryAllByTestId('component-answers')).toHaveLength(1)
    expect(component.queryAllByTestId('component-answer')).toHaveLength(4)
  })
})
