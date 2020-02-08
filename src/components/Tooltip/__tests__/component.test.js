import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Tooltip from '../component'

describe('Tooltip', () => {
  const props = {
    isShow: false,
    label: 'label',
    tooltip: 'tooltip',
  }
  test('matches snapshot', () => {
    const { container } = render(<Tooltip {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders nothing by default', () => {
    const { queryByTestId } = render(<Tooltip {...props} />)
    expect(queryByTestId('component-tooltip')).toBeFalsy()
  })
  test('renders on isShow with hidden tooltip', () => {
    const { queryByTestId, queryByText } = render(<Tooltip {...props} isShow />)
    expect(queryByTestId('component-tooltip')).toBeTruthy()
    expect(queryByText('tooltip')).not.toBeVisible()
    expect(queryByText('label')).toBeTruthy()
  })
  test('shows tooltip on toggle click', () => {
    const { container, queryByText } = render(<Tooltip {...props} isShow className="class" />)
    fireEvent.click(container.querySelector('.class'))
    expect(queryByText('tooltip')).toBeVisible()
    fireEvent.click(container.querySelector('.class'))
    expect(queryByText('tooltip')).not.toBeVisible()
  })
})
