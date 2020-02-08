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
    const { getByTestId } = render(<Button {...props} />)
    expect(getByTestId('button-children')).toBeTruthy()
    expect(getByTestId('button-loader')).toHaveStyle({ display: 'none' })
  })
  test('hides children and shows loader on requested', () => {
    const { getByTestId } = render(<Button {...props} asyncStatus={SHAPE_ASYNC_STATUS_REQUESTED} />)
    expect(getByTestId('button-children')).toBeEmpty()
    expect(getByTestId('button-loader')).toBeVisible()
  })
})
