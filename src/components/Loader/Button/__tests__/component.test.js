import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import ButtonLoader from '../component'
import { SHAPE_ASYNC_STATUS_INITIAL, SHAPE_ASYNC_STATUS_REQUESTED } from '../../../../constants'

describe('ButtonLoader', () => {
  const props = {
    asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
  }
  test('matches snapshot', () => {
    const { container } = render(<ButtonLoader {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders nothing by default', () => {
    const { queryByTestId } = render(<ButtonLoader {...props} />)
    expect(queryByTestId('component-svg')).toBeFalsy()
  })
  test('loader on requested', () => {
    const { queryByTestId } = render(<ButtonLoader asyncStatus={SHAPE_ASYNC_STATUS_REQUESTED} />)
    expect(queryByTestId('component-svg')).toBeTruthy()
  })
})
