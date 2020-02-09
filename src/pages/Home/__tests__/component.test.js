import '@testing-library/jest-dom'
import React from 'react'
import { render, act } from '@testing-library/react'
import axiosMock from 'axios'
import '@testing-library/jest-dom/extend-expect'

import { questions } from '../../../constants'
import Home from '../component'

describe('home', () => {
  test('loads data', async () => {
    axiosMock.get.mockImplementationOnce(() => (
      Promise.resolve({
        data: questions
      })
    ))

    let component
    await act(async () => {
      component = await render(<Home />)
    })
    const loadingNode = await component.queryByTestId('component-line-loader')

    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(loadingNode).toBeFalsy()
    expect(component.queryByTestId('component-error')).toBeFalsy()
    expect(component.queryByTestId('component-next-button')).toBeTruthy()
    expect(component.queryByTestId('component-results')).toBeFalsy()
    expect(component.queryByTestId('component-timer')).toBeTruthy()

    expect(component.queryAllByTestId('component-question')).toHaveLength(10)
    expect(component.queryAllByTestId('component-answers')).toHaveLength(10)
    expect(component.queryAllByTestId('component-answer')).toHaveLength(40)
  })
})
