import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import axiosMock from 'axios'
import '@testing-library/jest-dom/extend-expect'

import Home from '../component'

test('loads data', async () => {
  axiosMock.get.mockImplementationOnce(() => (
    Promise.resolve({
      data: [{}, {}]
    })
  ))

  const { queryByTestId } = render(<Home />)
  const loadingNode = queryByTestId('component-line-loader')

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(loadingNode).toBeTruthy()
})
