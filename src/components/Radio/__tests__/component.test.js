import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Radio from '../component'

describe('Radio', () => {
  const props = {
    isQuizComplete: false,
    isDisabled: false,
    checked: false,
    id: 1,
    accentColor: 'red',
  }
  test('matches snapshot', () => {
    const { container } = render(<Radio {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders elements', () => {
    const { container } = render(<Radio {...props} isShow />)
    expect(container.querySelector('input')).not.toBeChecked()
  })
  test('renders elements', () => {
    const { container } = render(<Radio {...props} isShow checked />)
    expect(container.querySelector('input')).toBeChecked()
  })
})
