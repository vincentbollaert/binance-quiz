import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Svg from '../component'

describe('Svg', () => {
  const props = {
    size: 2,
    svg: '',
  }
  test('matches snapshot', () => {
    const { container } = render(<Svg {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('sets correct styles', () => {
    const { queryByTestId, rerender } = render(<Svg {...props} />)
    expect(queryByTestId('component-svg')).toHaveStyle({ width: '2rem', height: '2rem' })

    rerender(<Svg svg="" width={1} />)
    expect(queryByTestId('component-svg')).toHaveStyle({ width: '1rem' })
  })
})
