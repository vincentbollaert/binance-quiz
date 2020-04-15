import React, { createContext, useReducer } from 'react'
import { any } from 'prop-types'

import reducer, { init } from '../pages/Home/reducer'

export const QuizContext = createContext(null)
export const QuizContextMethods = createContext(null)

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  return (
    <QuizContext.Provider value={state}>
      <QuizContextMethods.Provider value={dispatch}>
        {children}
      </QuizContextMethods.Provider>
    </QuizContext.Provider>
  )
}

QuizProvider.propTypes = {
  children: any.isRequired,
}
