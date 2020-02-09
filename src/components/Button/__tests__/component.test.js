import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Button from '../component'
import { SHAPE_ASYNC_STATUS_INITIAL, SHAPE_ASYNC_STATUS_REQUESTED } from '../../../constants'

describe('Button', () => {
  const props = {
    asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
    children: 'child',
  }
  test('matches snapshot', () => {
    const { container } = render(<Button {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders elements', () => {
    const { queryByTestId, queryByText } = render(<Button {...props} />)
    expect(queryByText('child')).toBeTruthy()
    expect(queryByTestId('component-svg')).toBeFalsy()
  })
  test('hides children and shows loader on requested', () => {
    const { queryByTestId, queryByText } = render(<Button {...props} asyncStatus={SHAPE_ASYNC_STATUS_REQUESTED} />)
    expect(queryByText('child')).toBeFalsy()
    expect(queryByTestId('component-svg')).toBeTruthy()
  })
})
