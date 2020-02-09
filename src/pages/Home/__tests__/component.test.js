import '@testing-library/jest-dom'
import React from 'react'
import { render, act } from '@testing-library/react'
import axiosMock from 'axios'
import '@testing-library/jest-dom/extend-expect'

import mockData from './mockData'
import Home from '../component'

describe('home', () => {
  test('loads data', async () => {
    axiosMock.get.mockImplementationOnce(() => (
      Promise.resolve({
        data: mockData
      })
    ))

    let test
    await act(async () => {
      test = await render(<Home />)
    })
    const loadingNode = await test.queryByTestId('component-line-loader')

    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(loadingNode).toBeFalsy()
    expect(test.queryByTestId('component-error')).toBeFalsy()
    expect(test.queryByTestId('component-next-button')).toBeTruthy()
    expect(test.queryByTestId('component-results')).toBeFalsy()
    expect(test.queryByTestId('component-timer')).toBeTruthy()

    expect(test.queryAllByTestId('component-question')).toHaveLength(10)
    expect(test.queryAllByTestId('component-answers')).toHaveLength(10)
    expect(test.queryAllByTestId('component-answer')).toHaveLength(40)
  })
})
