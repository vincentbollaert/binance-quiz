import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Accordion from '../component'

describe('Accordion', () => {
  const props = {
    isShow: false,
    content: 'content',
  }
  test('matches snapshot', () => {
    const { container } = render(<Accordion {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders nothing by default', () => {
    const { queryByTestId } = render(<Accordion {...props} />)
    expect(queryByTestId('component-accordion')).toBeFalsy()
  })
  test('renders on isShow with hidden body', () => {
    const { queryByTestId, queryByText } = render(<Accordion {...props} isShow />)
    expect(queryByTestId('component-accordion')).toBeTruthy()
    expect(queryByText('content')).not.toBeVisible()
  })
  test('shows body on toggle click', () => {
    const { container, queryByText } = render(<Accordion {...props} isShow className="class" />)
    fireEvent.click(container.querySelector('.class'))
    expect(queryByText('content')).toBeVisible()
    fireEvent.click(container.querySelector('.class'))
    expect(queryByText('content')).not.toBeVisible()
  })
})
