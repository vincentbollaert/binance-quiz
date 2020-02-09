import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import AdditionalInfo from '../component'

describe('AdditionalInfo', () => {
  const props = {
    isTimeout: false,
    isCorrect: false,
    isQuizComplete: false,
    accentColor: undefined,
    answer: 'Maker',
    correctAnswer: 'Maker',
    questionMatchingAnswer: { slug: 'slug', excerpt: 'excerpt' },
    dummyRandomNumber: 22,
  }
  test('matches snapshot', () => {
    const { container } = render(<AdditionalInfo {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders elements conditionally', () => {
    const { container, queryByTestId, queryByText, rerender } = render(<AdditionalInfo {...props} />)
    expect(queryByTestId('component-additional-info')).toBeTruthy()
    expect(queryByText('22% chose this option')).toBeFalsy()

    rerender(<AdditionalInfo {...props} isQuizComplete accentColor="red" />)
    expect(queryByText('22% of users got this right')).toBeTruthy()

    rerender(<AdditionalInfo {...props} accentColor="red" />)
    expect(queryByText('22% chose this option')).toBeTruthy()

    rerender(<AdditionalInfo {...props} accentColor="red" isQuizComplete answer="something" />)
    expect(queryByText('excerpt')).toBeTruthy()
    expect(container.querySelector('a')).toHaveAttribute('href', 'https://www.binance.vision/glossary/slug')
  })
})
