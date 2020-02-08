import '@testing-library/jest-dom'
import React from 'react'
import { render, act } from '@testing-library/react'
import axiosMock from 'axios'
import '@testing-library/jest-dom/extend-expect'

import Home from '../component'

test('loads data', async () => {
  axiosMock.get.mockImplementationOnce(() => (
    Promise.resolve({
      data: [{ id: 0, answers: ['1', '2'] }, { id: 1, answers: ['3', '4'] }]
    })
  ))

  let test
  await act(async () => {
    test = await render(<Home />)
  })
  const loadingNode = await test.queryByTestId('component-line-loader')

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(loadingNode).toBeFalsy()
})
