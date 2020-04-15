import React, { createContext } from 'react'
import { any } from 'prop-types'

export const QuizContext = createContext(null)

export const QuizProvider = ({ children }) => {
  return (
    <QuizContext.Provider value="test">
      {children}
    </QuizContext.Provider>
  )
}

QuizProvider.propTypes = {
  children: any.isRequired,
}
